import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {api} from "@apis/index";
import AiResponse from "@components/prompt/AiResponse";
import {IPrompt} from "@/types/prompt";

interface IPromptKeyProps {
    data: IPrompt[];
}

const AiResponseList = ({data}: IPromptKeyProps) => {

    return (
        <AiResponseContainer>
            {data.map((response: any, index: number) => (
                <AiResponse response={response} index={index + 1}/>
            ))}
            {data.length === 0 && (
                <div>실행한 결과가 없습니다.</div>
            )}
        </AiResponseContainer>
    );
}


const AiResponseContainer = styled.div`
`;

export default AiResponseList;