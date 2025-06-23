import styled from "styled-components";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {basePromptState} from "@state/BasePromptState";
import {useNavigate} from "react-router-dom";
import {IAiMessage, IPrompt} from "@/types/prompt";
import LabeledInput from "@components/atom/LabeledInput";
import {api} from "@apis/index";
import {postAiResponse} from "@apis/aiResponse";

interface IPromptKeyProps {
    prompt: IPrompt;
    onRunComplete: () => void;
}

const PromptViewer = ({prompt, onRunComplete}: IPromptKeyProps) => {
    const [variableMap, setVariableMap] = useState<Map<string, string>>(new Map());
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const isRunnable = (prompt: IPrompt, variables: Map<string, string>): boolean => {
        let runnable = true;

        if (!prompt.params || !prompt.params.messages || prompt.params.messages.length === 0) {
            runnable = false;
        }

        variables.forEach((value, key) => {
            if (value.trim() === '') {
                runnable = false;
            }
        });

        return runnable;
    }

    const handleRunButtonClick = async () => {
        if (isRunning) {
            alert("이미 실행 중입니다.");
            return;
        }


        // prompt.params.messages 에 variableMap 의 값을 적용하여 prompt 클론 제작 및 실행
        const clonedPrompt = {...prompt};
        clonedPrompt.params = {...clonedPrompt.params, messages: clonedPrompt.params?.messages?.map(msg => {
            const newContent = msg.content.replace(/{(.*?)}/g, (match, p1) => {
                return variableMap.get(p1) || match;
            });
            return {...msg, content: newContent};
        })};

        setIsRunning(true);
        const llmRes = await api.ai.getNewAiResponse({
            model: clonedPrompt.params?.model || 'gpt-3.5-turbo',
            messages: clonedPrompt.params?.messages || [],
            temperature: clonedPrompt.params?.temperature || 0.7,
            max_tokens: clonedPrompt.params?.max_completion_tokens || 1000,
            max_completion_tokens: clonedPrompt.params?.max_completion_tokens || 1000,
        });

        const saveAiResponseRes = await api.aiResponse.postAiResponse({
            prompt_name: clonedPrompt.prompt_name,
            version: clonedPrompt.version,
            answer: llmRes.answer,
            variables: Object.fromEntries(variableMap.entries()),
        })

        console.log(saveAiResponseRes);

        await onRunComplete();

        setIsRunning(false);
    }

    const handleVariableChange = (key: string, value: string) => {
        const newMap = new Map(variableMap);
        newMap.set(key, value);
        setVariableMap(newMap);

        console.log(newMap);
    };

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setBasePrompt] = useRecoilState(basePromptState);

    const handlePlaygroundClick = () => {
        setBasePrompt(prompt);
        navigate('/prompt/playground')
    }

    return (
        <PromptWrapper>
            <PromptName>{prompt.prompt_name}<PromptVersion>{prompt.version}</PromptVersion></PromptName>
            <Params>
                <Param>
                    <Label>Max Completion Tokens</Label>
                    <Value>{prompt.params?.max_completion_tokens}</Value>
                </Param>
                <Param>
                    <Label>Temperature</Label>
                    <Value>{prompt.params?.temperature}</Value>
                </Param>
                <Param>
                    <Label>Created At</Label>
                    <Value>{prompt.created_at ? new Date(prompt.created_at).toLocaleString() : "N/A"}</Value>
                </Param>
            </Params>
            <MessagesContainer
                messages={prompt.params?.messages || []}
                onVariableChange={handleVariableChange}
                variableMap={variableMap}/>
            <ButtonContainer>
                <RunButton disabled={!isRunnable(prompt, variableMap)} onClick={handleRunButtonClick}>실행</RunButton>
                <Nav onClick={handlePlaygroundClick}>플레이그라운드로</Nav>
            </ButtonContainer>
            {isRunning && (
                <LoadingBackground>
                    <LoadingContent>
                        실행 중입니다.
                    </LoadingContent>
                </LoadingBackground>
            )}
        </PromptWrapper>
    );
}

const LoadingBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;


const LoadingContent = styled.div`
    background-color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface IMessagesContainerProps {
    messages: IAiMessage[];
    onVariableChange: (key: string, value: string) => void;
    variableMap: Map<string, string>;
}

const MessagesContainer = ({messages, variableMap, onVariableChange}: IMessagesContainerProps) => {
    const allVariables = React.useMemo(() => {
        const varSet = new Set<string>();
        const regex = /{(.*?)}/g;

        messages.forEach(message => {
            let match;
            while ((match = regex.exec(message.content)) !== null) {
                varSet.add(match[1]);
            }
        });

        return Array.from(varSet);
    }, [messages]);

    return (
        <Messages>
            <Label>Messages</Label>
            {messages.map((msg, idx) => (
                <>
                    <Message>
                        <Role key={`role-${idx}`}>{msg.role}</Role>
                        <Content key={`content-${idx}`}>
                            {msg.content}
                        </Content>
                    </Message>
                </>
            ))}

            <Label>Variables</Label>
            {allVariables.map((variable) => (
                <LabeledInput
                    label={variable}
                    type={"text"}
                    value={variableMap.get(variable) || ''}
                    onChange={e => onVariableChange(variable, e.target.value)}
                    height={"3.5rem"}
                />
            ))}
        </Messages>
    );

};

const VariableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
`;


const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0.5rem;
`;

const RunButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    margin-right: 1rem;
    &:hover {
        background-color: #0056b3;
    }
    
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;


const Nav = styled.div`
    background-color: white;
    color: #007bff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
        background-color: #0056b3;
    }
`;


const PromptWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 20rem;
    min-width: 20rem;
    background: beige;
    display: flex;
    flex-direction: column;
`;

const PromptName = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    padding-left: 0.5rem;
    margin-bottom: 1rem;
`;

const PromptVersion = styled.span`
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    padding-left: 0.5rem;
    color: #555;
`;

const Params = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;

const MessageLabel = styled.div`
    font-weight: bold;
    color: #333;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
`;

const Param = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    //background-color: #f9f9f9;
    border-radius: 4px;
    width: 100%;
    height: 3rem;
`;

const Label = styled.div`
    width: 30%;
`;

const Value = styled.div`
    border: 1px solid #ccc;
    width: 70%;
    padding: 0.5rem;
    border-radius: 1rem;
`;

const Messages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem;
`;

const Message = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

const Role = styled.div`
    font-weight: bold;
    color: #333;
`;


const Content = styled.div`
    margin-top: 0.5rem;
    color: #555;
`;


export default PromptViewer;