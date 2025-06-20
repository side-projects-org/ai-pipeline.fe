import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {api} from "@apis/index";
import AiResponse from "@components/prompt/AiResponse";

interface IPromptKeyProps {
    promptName: string | undefined;
    version: string | undefined;
}

const AiResponseList = ({promptName, version}: IPromptKeyProps) => {
    const [loading, setLoading] = useState<boolean>(true);

    const [aiResponseList, setAiResponseList] = useState<any[]>(new Array(10).fill({q: 1}));

    useEffect(() => {
        setTimeout(() => {
            loadingAiResponseList();
        }, 2000);
    }, []);


    const loadingAiResponseList = async () => {
        if (!promptName || !version) {
            return;
        }

        // TODO 단건 조회 API 로 변경해야함
        const aiResponseRes = await api.ai.getAllAiResponseByPrompt(promptName, version);

        setAiResponseList(aiResponseRes);

        setLoading(false);
    }

    return (

        <AiResponseContainer>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {aiResponseList.map((response: any, index: number) => (
                        <AiResponse response={response} index={index + 1}/>
                    ))}
                    {aiResponseList.length === 0 && (
                        <div>실행한 결과가 없습니다.</div>
                    )}
                </>
            )}


        </AiResponseContainer>
    );
}


const AiResponseContainer = styled.div`
`;

export default AiResponseList;