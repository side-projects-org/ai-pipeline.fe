import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {api} from "@apis/index";
import AIResponse from "@components/prompt/AIResponse";

interface IPromptKeyProps {
    promptName: string | undefined;
    version: string | undefined;
}

const AIResponseList = ({promptName, version}: IPromptKeyProps) => {
    const [loading, setLoading] = useState<boolean>(true);

    const [aiResponseList, setAIResponseList] = useState<any[]>(new Array(10).fill({q: 1}));

    useEffect(() => {
        setTimeout(() => {
            loadingAIResponseList();
        }, 2000);
    }, []);


    const loadingAIResponseList = async () => {
        if (!promptName || !version) {
            return;
        }

        // TODO 단건 조회 API 로 변경해야함
        const aiResponseRes = await api.ai.getAllAIResponseByPrompt(promptName, version);

        setAIResponseList(aiResponseRes);

        setLoading(false);
    }

    return (

        <AIResponseContainer>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {aiResponseList.map((response: any, index: number) => (
                        <AIResponse response={response} index={index + 1}/>
                    ))}
                    {aiResponseList.length === 0 && (
                        <div>실행한 결과가 없습니다.</div>
                    )}
                </>
            )}


        </AIResponseContainer>
    );
}


const AIResponseContainer = styled.div`
`;

const Response = styled.div`
    width: 100%;
    height: 100%;
    background: aquamarine;
`;


const AIResponseWrapper = styled.div`
    height: 20rem;
    min-width: 20rem;
    border: 1px solid #ccc;
    position: relative;
`;

const Index = styled.div`
    right: 50%;
    bottom: -1rem;
    position: absolute;
`;


export default AIResponseList;