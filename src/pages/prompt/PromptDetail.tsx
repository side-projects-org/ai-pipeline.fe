import React, {useEffect, useState} from "react";
import {api} from "@apis/index";
import {useNavigate, useParams, useRoutes} from "react-router-dom";
import {useRecoilState} from "recoil";
import {basePromptState} from "@state/BasePromptState";
import styled from "styled-components";


const PromptDetail: React.FC = () => {
    const navigate = useNavigate();
    // paths variable 에 값이 있다면, 해당 값으로 기본값 설정
    const { promptName, version } = useParams();

    const [prompt, setPrompt] = useState<any>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    const [_, setBasePrompt] = useRecoilState(basePromptState);

    useEffect(() => {
        loadingPromptDetail();
    }, []);

    const loadingPromptDetail = async () => {
        if (!promptName || !version) {
            return;
        }

        const res = await api.prompt.getAllPromptsByName(promptName);
        if (res.length === 0 || !res.some((p: any) => p.version === version)) {
            alert("해당 프롬프트가 존재하지 않습니다. 이전 페이지로 돌아갑니다.");
            navigate(-1);
            return;
        }

        setPrompt(res.find((p: any) => p.version === version));
        setLoading(false);
    }

    const handlePlaygroundClick = () => {
        setBasePrompt(prompt);
        navigate('/prompt/playground')
    }

    return (
        <PageLayout>
            {loading ? (
                <PromptName>{promptName}
                    <PromptVersion>{version} 불러오는 중</PromptVersion>
                </PromptName>
            ) : (
                <>

                    <PromptName>{prompt.prompt_name}
                        <PromptVersion>{prompt.version}</PromptVersion>
                    </PromptName>

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
                    <MessageLabel>Messages</MessageLabel>
                    <Messages>
                        {prompt.params?.messages.map((message: any, index: number) => (
                            <Message>
                                <Role>{message.role}</Role>
                                <Content>{message.content}</Content>
                            </Message>
                        ))}
                    </Messages>
                    <ButtonContainer>
                        <Nav onClick={handlePlaygroundClick}>플레이그라운드로</Nav>
                        <Nav onClick={() => navigate(-1)}>목록으로</Nav>
                    </ButtonContainer>
                </>
            )}

        </PageLayout>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0.5rem;
`;


const Nav = styled.div`
    cursor: pointer;
    color: #007bff;
    font-weight: bold;
    margin-left: 1rem;
`;

const PageLayout = styled.div`
    width: 100%;
    height: 100%; /**/
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.5rem 0;
    // 페이지가 전체가 차게
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

export default PromptDetail;

