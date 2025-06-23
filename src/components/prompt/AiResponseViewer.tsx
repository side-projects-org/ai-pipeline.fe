import styled from "styled-components";
import React from "react";
import {IAiResponse} from "@/types/prompt";

interface IAiResponseProps {
    response: IAiResponse;
    index: number;

}

const AiResponseViewer = ({index, response}: IAiResponseProps) => {

    console.log(Object.entries(response.variables));

    return (
        <AiResponseWrapper key={index}>
            <Index>{index}</Index>
            <Response>
                <Variables>
                    {response.variables && Object.entries(response.variables)
                        .filter(([key, value]) => typeof value === 'string')
                        .map(([key, value]) => (
                            <Variable>{key}: {value}</Variable>
                        ))}
                </Variables>
                <AiAnswer>{response.answer.choices?.[0]?.message.content || ""}</AiAnswer>

            </Response>
        </AiResponseWrapper>
    );
}

const Variables = styled.div`
    width: 100%;
    padding: 1rem;
    background: #f0f0f0;
    border-top: 1px solid #ccc;
    overflow: auto;
`;

const Variable = styled.div`
    padding: 0.5rem;
    font-family: monospace;
    color: #333;
`;

const AiAnswer = styled.div`
    width: 100%;
    padding: 1rem;
    background: white;
    font-family: monospace;
    //color: #333;
`;

const Response = styled.div`
    width: 20rem;
    height: 100%;
    overflow: auto;
    background: aquamarine;
`;


const AiResponseWrapper = styled.div`
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


export default AiResponseViewer;