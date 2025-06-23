import styled from "styled-components";
import React from "react";
import AiResponseViewer from "@components/prompt/AiResponseViewer";
import {IAiResponse} from "@/types/prompt";

interface IPromptKeyProps {
    data: IAiResponse[];
}

const AiResponseList = ({data}: IPromptKeyProps) => {
    console.log('data', data);
    return (
        <AiResponseContainer>
            {data.map((response: any, index: number) => (
                <AiResponseViewer response={response} index={index + 1}/>
            ))}
            {data.length === 0 && (
                <div>실행한 결과가 없습니다.</div>
            )}
        </AiResponseContainer>
    );
}


const AiResponseContainer = styled.div`
    width: 100%;
    height: 20rem;
    display: flex;
    flex-direction: row;
`;

export default AiResponseList;