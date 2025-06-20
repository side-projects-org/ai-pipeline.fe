import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {api} from "@apis/index";

interface IAIResponseProps {
    response: any;
    index: number;

}

const AIResponse = ({index, response}: IAIResponseProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [prompt, setPrompt] = useState<any>(null);

    return (
        <AIResponseWrapper key={index+1}>
            <Index>{index+1}</Index>
            <Response>{JSON.stringify(response)}</Response>
        </AIResponseWrapper>
    );
}

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


export default AIResponse;