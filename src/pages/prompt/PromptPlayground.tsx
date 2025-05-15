import React from "react";
import styled from "styled-components";
import LabeledInput from "@components/atom/LabeledInput";
import {v4 as uuidv4} from "uuid";


const PromptPlayground: React.FC = () => {
    const [promptName, setPromptName] = React.useState<string>("");
    const [promptVersion, setPromptVersion] = React.useState<string>("");
    const [maxTokens, setMaxTokens] = React.useState<number>(100);
    const [temperature, setTemperature] = React.useState<number>(1);

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

    const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto"; // Reset height to calculate scrollHeight
        const newHeight = Math.min(e.target.scrollHeight, 16 * 7.5); // 80px = 5rem
        e.target.style.height = `${newHeight}px`;
    };

    const closePopup = () => {
        setPopupVisible(false);
    }

    return (
        <PageLayout>
            <PromptWrapper>
                <PromptSettingWrapper>
                    <LabeledInput label={"이름"} type={"text"} value={promptName}
                                  onChange={e => setPromptName(e.target.value)}/>
                    <LabeledInput label={"버전"} type={"text"} value={promptVersion} placeholder={new Date().toISOString()}
                                  onChange={e => setPromptVersion(e.target.value)}/>
                    <LabeledInput label={"최대 토큰 수"} type={"number"} value={maxTokens}
                                  onChange={e => setMaxTokens(Number(e.target.value))}/>
                    <LabeledInput label={"창의성"} type={"number"} value={temperature}
                                  onChange={e => setTemperature(Number(e.target.value))}/>
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
                    <RunButton onClick={async () => {
                        setResponse(null);
                        setPopupMessage("프롬프트를 실행합니다!");
                        setPopupVisible(true);
                        setTimeout(() => {
                            setResponse(dummyResponse);
                            setPopupVisible(false);
                        }, 2000);
                    }}>실행</RunButton>
                    <SaveButton onClick={async () => {
                        // todo
                    }}>저장</SaveButton>
                </ButtonWrapper>
            </PromptWrapper>
            <PromptResponseWrapper>
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


const MessagesContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    max-height: 50%;
    //height: fit-content;
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
    width: 100%;
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
`;

const RunButton = styled(ActionButton)`
`;

const SaveButton = styled(ActionButton)`
`;

const PromptResponse = styled.textarea`
    width: 100%;
    resize: none;
    height: 80%;
    border-radius: 1rem;
    padding: 1rem;
`


export default PromptPlayground;

