import React from "react";
import styled from "styled-components";
import LabeledInput from "@components/atom/LabeledInput";
import {v4 as uuidv4} from "uuid";
import {api} from "@apis/index";


const PromptPlayground: React.FC = () => {
    const [promptName, setPromptName] = React.useState<string>("");
    const [promptVersion, setPromptVersion] = React.useState<string>("");
    const [maxTokens, setMaxTokens] = React.useState<number>(100);
    const [temperature, setTemperature] = React.useState<number>(1);

    const [saveMode, setSaveMode] = React.useState<boolean>(false);

    const [dummyMessages, setDummyMessages] = React.useState<any[]>([
        {
            role: "user",
            content: "안녕하세요"
        },
        {
            role: "assistant",
            content: "안녕하세요! 무엇을 도와드릴까요?"
        },
        {
            role: "user",
            content: "오늘 날씨 어때?"
        },
    ]);

    const [popupMessage, setPopupMessage] = React.useState<string>("");
    const [popupVisible, setPopupVisible] = React.useState<boolean>(false);

    const [response, setResponse] = React.useState<object | null>(null);

    const dummyResponse = {
        "key": uuidv4(),
        "prompt_name": promptName, // 프롬프트의 이름
        "version": promptVersion, // 프롬프트의 버전
        "params": {
            "messages": [
                dummyMessages
            ],
            "max_tokens": maxTokens,
            "model": "gpt-3.5-turbo",
            "response_format": "text",
            "temperature": temperature,
            "stream": false,
        }
    }

    const validatePromptName = (name: string) => !!name;

    const validateVersion = (version: string) => !!version;

    const validateMaxTokens = (tokens: number) => Number.isInteger(tokens) && tokens > 0;

    const validateTemperature = (temp: number) => !isNaN(temp) && temp >= 0 && temp <= 1;

    const validateMessages = (messages: any[]) => messages.length > 0 && messages.every(msg => !!msg.content);

    const validateFunctions = [
        () => validateMaxTokens(maxTokens),
        () => validateTemperature(temperature),
        () => validateMessages(dummyMessages),
    ]

    const isRunButtonDisabled = () => {
        return !validateMaxTokens(maxTokens) || !validateTemperature(temperature) || !validateMessages(dummyMessages);
    }

    const isSaveButtonDisabled = () => {
        if (saveMode) {
            return !validatePromptName(promptName) || !validateVersion(promptVersion) || !validateMaxTokens(maxTokens) || !validateTemperature(temperature) || !validateMessages(dummyMessages);
        } else {
            return !validateMaxTokens(maxTokens) || !validateTemperature(temperature) || !validateMessages(dummyMessages);
        }
    }

    const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto"; // Reset height to calculate scrollHeight
        const newHeight = Math.min(e.target.scrollHeight, 16 * 7.5); // 80px = 5rem
        e.target.style.height = `${newHeight}px`;
    };

    const closePopup = () => {
        setPopupVisible(false);
    }

    const handleRunButtonClick = async () => {
        const data = {
            model: "gpt-3.5-turbo",
            messages: dummyMessages,
            temperature: temperature,
            max_tokens: maxTokens,
            max_completion_tokens: maxTokens
        }
        try {
            setResponse(null);
            setPopupMessage("AI 에게 질문을 던집니다!");
            setPopupVisible(true);

            const res = await api.ai.getNewAIResponse(data);

            setResponse(res);
        } catch (err) {
            console.error(err);
        } finally {
            setPopupVisible(false);
        }
    }

    const handleSaveButtonClick = async () => {
        // 인풋값 추가 검증
        if (isSaveButtonDisabled()) {
            setPopupMessage("모든 필드를 입력해주세요.");
            setPopupVisible(true);
            return;
        }

        if (!saveMode) {
            setSaveMode(true);
            setPopupMessage("저장모드로 변경합니다.");
            setPopupVisible(true);
            setTimeout(() => {
                setPopupVisible(false);
            }, 1000);
            return;
        }

        // AI 응답 대기 로딩화면 설정
        setResponse(null);
        setPopupMessage("프롬프트를 저장합니다!");
        setPopupVisible(true);
        setSaveMode(false);

        // 프롬프트 저장
        const data = {
            prompt_name: promptName,
            version: promptVersion,
            messages: dummyMessages,
            max_tokens: maxTokens,
            max_completion_tokens: maxTokens,
            model: "gpt-3.5-turbo",
            response_format: "text",
            temperature: temperature,
        }

        try {
            const res = await api.prompt.createPrompt(data);
            setResponse(res);
            setPopupMessage("프롬프트가 저장되었습니다.");
        } catch (err) {
            console.error(err);
            setPopupMessage("프롬프트 저장에 실패했습니다.");
        } finally {
            // 1초 후 팝업 닫기
            setTimeout(() => {
                setPopupVisible(false);
            }, 1000);
        }
    }

    return (
        <PageLayout>
            <PromptWrapper>
                <PromptParameterLabel>파라미터</PromptParameterLabel>
                <PromptSettingWrapper>
                    {/* Parameters */}
                    {saveMode && (
                        <>
                            <LabeledInput label={"이름"} type={"text"} value={promptName} placeholder={"프롬프트 이름"} validate={validatePromptName} guideLine={"이름은 필수입니다."} guideColor={"red"}
                                          onChange={e => setPromptName(e.target.value)}/>
                            <LabeledInput label={"버전"} type={"text"} value={promptVersion} placeholder={new Date().toISOString()} validate={validateVersion} guideLine={"버전은 필수입니다."} guideColor={"red"}
                                          onChange={e => setPromptVersion(e.target.value)}/>
                        </>
                    )}
                    <LabeledInput label={"최대 토큰 수"} type={"number"} value={maxTokens} validate={validateMaxTokens} guideLine={"토큰은 정수이며, 0 보다 커야 합니다."} guideColor={"red"}
                                  onChange={e => setMaxTokens(Number(e.target.value))}/>
                    <LabeledInput label={"창의성"} type={"number"} value={temperature} placeholder={"0~1"} validate={validateTemperature} guideLine={"창의성은 0과 1 사이의 숫자입니다."} guideColor={"red"}
                                  onChange={e => setTemperature(Number(e.target.value))}/>

                    {/* Messages */}
                    <MessageLabel>메세지</MessageLabel>
                    <MessagesContainer>
                        {dummyMessages.map((message, index) => {
                            return (
                                <Message key={`${index}`}>
                                    <Role defaultValue={index % 2 === 0 ? 'user' : 'assistant'}>
                                        <Option value={"user"}>User</Option>
                                        <Option value={"assistant"}>Assistant</Option>
                                    </Role>
                                    <Content
                                        value={message.content}
                                        onChange={e => {
                                            const newMessages = [...dummyMessages];
                                            newMessages[index].content = e.target.value;
                                            setDummyMessages(newMessages);
                                            handleInputResize(e);
                                        }}
                                    />
                                </Message>
                            );
                        })}
                        <AddMessageButton
                            onClick={() => {
                                setDummyMessages([...dummyMessages, {role: "user", content: ""}]);
                            }}>추가</AddMessageButton>
                    </MessagesContainer>
                </PromptSettingWrapper>
                <ButtonWrapper>
                    <RunButton onClick={handleRunButtonClick} disabled={isRunButtonDisabled()}>실행</RunButton>
                    <SaveButton onClick={handleSaveButtonClick} disabled={isSaveButtonDisabled()}>저장</SaveButton>
                    {saveMode && <SaveModeCancelButton onClick={() => setSaveMode(false)}>저장모드 해제</SaveModeCancelButton>}
                </ButtonWrapper>
            </PromptWrapper>
            <PromptResponseWrapper>
                <AIResponseLabel>AI 응답</AIResponseLabel>
                <PromptResponse value={response ? JSON.stringify(response, null, 4) : ""}/>
            </PromptResponseWrapper>
            {popupVisible && (
                <PopupWrapper>
                    <Popup>
                        <PopupMessage>{popupMessage}</PopupMessage>
                        <CloseButton onClick={closePopup}>X</CloseButton>
                    </Popup>
                </PopupWrapper>
            )}
        </PageLayout>
    )
}

const PopupWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Popup = styled.div`
    width: 20rem;
    height: 10rem;
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const PopupMessage = styled.div`
    width: fit-content;
    height: 5rem;
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled.button`
    right: 0.5rem;
    top: 0.5rem;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid black;
`;

const PageLayout = styled.div`
    width: 100%;
    height: 100%; /**/
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0.5rem 0;
    // 페이지가 전체가 차게
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 1rem;
`;

const PromptWrapper = styled(Section)`
    width: 50%;
    justify-content: space-between;
`;

const PromptResponseWrapper = styled(Section)`
    width: 50%;
    height: 100%;
    
`;

const PromptSettingWrapper = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
`;

const MessageLabel = styled.p`
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-weight: bold;
`;


const MessagesContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 50%;
`;

const Message = styled.div`
    width: 100%;
    min-height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 0 1rem 0;
`;


const Content = styled.textarea`
    flex-grow: 1;
    min-height: 2rem;
    line-height: 1.5rem;
    /* 길이가 꽉차면 높이를 늘리기 */
    resize: none;
    overflow: hidden;
    border-radius: 0.8rem;
    border: 1px solid #ccc;
    padding: 0 0.8rem;
`;

const Role = styled.select`
    height: 100%;
    line-height: 2rem;
    border: none;
    margin-right: 0.5rem;
`;

const Option = styled.option``;

const AddMessageButton = styled.button`
    width: 15%;
    height: 2rem;
    border-radius: 0.8rem;
    border: 1px solid black;
    margin: 0.5rem 0;
`;

const ActionButton = styled.button`
    flex-grow: 1;
    border-radius: 1.5rem;
    height: 3rem;
    margin: 0 0.5rem;
    cursor: pointer;
    &:disabled {
        background: #ccc;
        color: #666;
        cursor: not-allowed;
    }
`;

const RunButton = styled(ActionButton)`
`;

const SaveButton = styled(ActionButton)`
`;


const SaveModeCancelButton = styled(ActionButton)`
    `;
const SectionLabel = styled.h2`
    width: 100%;
    height: 1rem;
`

const AIResponseLabel = styled(SectionLabel)``;

const PromptParameterLabel = styled(SectionLabel)``;

const PromptResponse = styled.textarea`
    width: 100%;
    resize: none;
    height: 80%;
    border-radius: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
`


export default PromptPlayground;

