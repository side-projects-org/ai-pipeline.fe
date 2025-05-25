import React, {useEffect, useState} from "react";
import styled from "styled-components";
import LabeledInput from "@components/atom/LabeledInput";
import {v4 as uuidv4} from "uuid";
import {api} from "@apis/index";
import {useNavigate, useParams, useRoutes} from "react-router-dom";


const PromptVersionList: React.FC = () => {
    const navigate = useNavigate();
    // paths variable 에 값이 있다면, 해당 값으로 기본값 설정
    const { promptName } = useParams();
    const [ prompts, setPrompts ] = useState<any[]>([]);


    useEffect(() => {
        loadingPromptVersionList();
    }, []);

    const loadingPromptVersionList = async () => {
        if (!promptName) {
            return;
        }

        const res = await api.prompt.getAllPromptsByName(promptName);

        if (res.length === 0) {
            alert("해당 프롬프트가 존재하지 않습니다. 이전 페이지로 돌아갑니다.");
            navigate(-1);
            return;
        }

        setPrompts([...res]);

        console.log("PromptVersionList", res);
    }

    const handlePromptCardClick = (prompt: any) => {
        navigate(`/prompt/${prompt.prompt_name}/${prompt.version}`);
    }

    const DisplayParams = ({prompt}: any) => {
        console.log("DisplayParams", prompt);
        const labels = ["maxTokens", "temperature", "createdAt"];
        const values = [
            prompt.params?.max_completion_tokens,
            prompt.params?.temperature,
            prompt.created_at ? new Date(prompt.created_at).toLocaleString() : "N/A"
        ];

        return (
            <PromptInfoLayout>
                <PromptCommit>commit : {prompt.commit ?? "TODO 아직 구현 안함 (버젼 변경사항 및 요약 작성할 위치)"}</PromptCommit>
                <PromptParams>
                    {labels.map((label, index) => (
                        <Param>
                            <Label>{label}</Label>
                            <Value>{values[index]}</Value>
                        </Param>
                    ))}
                </PromptParams>
            </PromptInfoLayout>
        );
    }

    return (
        <PageLayout>
            <PromptName>{promptName}</PromptName>
            {prompts.map((p) => (
                <PromptVersionCard key={uuidv4()} style={{margin: '20px 0'}} onClick={() => {
                    handlePromptCardClick(p);
                }}>
                    <PromptVersion>{p.version}</PromptVersion>
                    <DisplayParams prompt={p}/>
                </PromptVersionCard>
            ))}
        </PageLayout>
    )
}

const PageLayout = styled.div`
    width: 100%;
    height: 100%; /**/
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.5rem 0;
    overflow-y: auto;
    // 페이지가 전체가 차게
`;

const PromptVersionCard = styled.div`
    width: 100%;
    height: 8rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const PromptName = styled.h2`
    margin-bottom: 1rem;
`;

const PromptVersion = styled.div`
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
`;

const PromptInfoLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    flex-grow: 1;
`;

const PromptCommit = styled.div`
    font-weight: bold;
    margin-right: 1rem;
`;

const PromptParams = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    //margin-top: 0.5rem;
    width: 100%;
`;

const Param = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
`;

const Label = styled.div`
    font-weight: bold;
    margin-bottom: 0.2rem;
    color: #555;
`;

const Value = styled.div`
    //background: gray;
`;

export default PromptVersionList;

