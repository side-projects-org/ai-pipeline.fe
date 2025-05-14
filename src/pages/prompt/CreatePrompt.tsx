import React, {useEffect} from "react";
import styled from "styled-components";
import {api} from "@apis/index";
import {json} from "node:stream/consumers";
import {createPrompt} from "@apis/prompt";


const CreatePrompt: React.FC = () => {
    const [messages, setMessages] = React.useState<number[]>(Array.from({length: 5}, (_, i) => i));
    const [domain, setDomain] = React.useState<string>("");

    const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDomain(e.target.value);
    }
    const [data, setData]= React.useState<any>(null);
    const [data2, setData2]= React.useState<any>(null);

    useEffect(() => {
        getPrompts()
    }, []);

    const getPrompts = async () => {
        const res = await api.prompt.getPrompts()

        setData(res);
    }

    const createPrompts = async () => {
        const res = await api.prompt.createPrompt({
            name: "Prompt NEW",
            writer: "Writer 1",
            description: "This is a description for Prompt 1",
            messages: [
                {
                    role: "user",
                    content: "What is the capital of France?"
                },
                {
                    role: "assistant",
                    content: "The capital of France is Paris."
                }
            ],
            max_tokens: 3000,
            temperature: 0.7,
            model: "gpt-3.5-turbo",
            response_format: "text"
        })

        console.log(res);
        setData(res);
    }

    return (
        <Layout>
            <TextInput type="text" placeholder="여기에 도메인을 입력하세요." value={domain} onChange={handleDomainChange}/>
            <TextInput type="text" placeholder="프롬프트 식별값을 입력하세요." />
            <TextInput type="text" placeholder="작성자 이름을 입력하세요." />
            <TextInput type="text" placeholder="temparature" />
            <TextInput type="text" placeholder="max_tokens" />
            <TextInput type="text" placeholder="model" />
            <TextInput type="text" placeholder="response_format" />
            <TextInput type="text" placeholder="stop" />
            <TextInput type="text" placeholder="top_p" />
            <TextInput type="text" placeholder="frequency_penalty" />
            <TextInput type="text" placeholder="presence_penalty" />
            <TextInput type="text" placeholder="best_of" />
            <TextInput type="text" placeholder="n" />
            <TextInput type="text" placeholder="stream" />
            <TextInput type="text" placeholder="logit_bias" />
            <TextInput type="text" placeholder="user" />
            <TextInput type="text" placeholder="stop_sequence" />
            <TextArea value={`${JSON.stringify(data, null, 4)}`} />
            <TextArea value={`${JSON.stringify(data2, null, 4)}`} />
            <Messages>
                {messages.map((i) => {
                    return (
                        <Message key={`message_${i}`}>
                            <Role value={i % 2 === 0 ? 'user' : 'assistant'}>
                                {['user', 'assistant'].map((role) => {
                                    return (
                                        <option key={`role_${role}`} value={role}>{role}</option>
                                    )
                                })}
                            </Role>
                            <Content type="text" placeholder="너의 이름을 말해줘" />
                        </Message>
                    )
                })}
                <AddMessageButton onClick={() => {
                    setMessages((prev) => [...prev, prev.length]);
                }}>메시지 추가</AddMessageButton>
            </Messages>
            <SaveButton onClick={async () => {
                // TODO: save prompt
                console.log("save prompt");
                await createPrompts();
                console.log(`domain : ${domain}`)
                const res = await api.prompt.getSample(domain);

                setData2(res);
            }}>저장</SaveButton>
        </Layout>
    )
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100vh;
    opacity: 0.8;
    background: black;
`;

const TextInput = styled.input`
    min-width: 15rem;
    max-width: 30rem;
    height: 3rem;
    border-radius: 0.8rem;
    border: 1px solid black;
    padding: 0 0.8rem;
`;

const TextArea = styled.textarea`
    min-width: 15rem;
    max-width: 30rem;
    height: 3rem;
    border-radius: 0.8rem;
    border: 1px solid black;
    padding: 0 0.8rem;
`;

const SaveButton = styled.button`
    width: 100%;
    height: 3rem;
    border-radius: 0.8rem;
    border: 1px solid black;
    background: #61dafb;
    color: black;
    margin-top: 1rem;

`;

const Messages = styled.div`
    min-width: 15rem;
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #61dafb;
    padding: 0.5rem;
`;

const AddMessageButton = styled.button`
    width: 100%;
    height: 2rem;
    border-radius: 0.8rem;
    border: 1px solid black;
    background: #61dafb;
    color: black;
    margin: 0.5rem 0;

`;

const Message = styled.div`
    min-width: 15rem;
    max-width: 30rem;
    height: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: beige;
    padding: 0 0.5rem;
`;

const Content = styled.input`
    flex-grow: 1;
    height: 2rem;
    line-height: 2rem;
`;

const Role = styled.select`
    height: 2rem;
    width: 6rem;
    line-height: 2rem;
`;


export default CreatePrompt;

