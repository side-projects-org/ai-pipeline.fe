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

        setPrompts(res);
    }

    const handlePromptCardClick = (prompt: any) => {
        navigate(`/prompt/${prompt.prompt_name}/${prompt.version}`);
    }

    return (
        <>
            {prompts.map((prompt) => (
                <div key={uuidv4()} style={{margin: '20px 0'}} onClick={() => {
                    handlePromptCardClick(prompt);
                }}>
                    <h2>{prompt.prompt_name}</h2>
                    <h4>{prompt.version}</h4>
                    <div>{JSON.stringify(prompt, null, 4)}</div>
                </div>
            ))}
        </>
    )
}



export default PromptVersionList;

