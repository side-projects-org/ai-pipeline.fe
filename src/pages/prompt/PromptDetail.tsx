import React, {useEffect, useState} from "react";
import {api} from "@apis/index";
import {useNavigate, useParams, useRoutes} from "react-router-dom";
import {useRecoilState} from "recoil";
import {basePromptState} from "@state/BasePromptState";
import styled from "styled-components";
import Prompt from "@components/prompt/Prompt";
import AIResponse from "@components/prompt/AIResponse";
import AIResponseList from "@components/prompt/AIResponseList";


const PromptDetail: React.FC = () => {
    const navigate = useNavigate();
    // paths variable 에 값이 있다면, 해당 값으로 기본값 설정
    const {promptName, version} = useParams();





    // const getRequiredParams = () => {
    //     if (!prompt || !prompt.params) {
    //         return [];
    //     }
    //
    //     const requiredParams: any[] = [];
    //     const messages = prompt.params.messages || [];
    //
    //     messages.forEach((message: any) => {
    //         if (message.role === 'user' && message.content) {
    //             // 모든 {variable} 형태의 변수를 찾아서 requiredParams에 추가
    //             const regex = /{{(.*?)}}/g;
    //             let match;
    //             while ((match = regex.exec(message.content)) !== null) {
    //                 const paramName = match[1].trim();
    //                 if (paramName && !requiredParams.includes(paramName)) {
    //                     requiredParams.push(paramName);
    //                 }
    //             }
    //         }
    //     });
    //
    //     return requiredParams;
    // }

    return (
        <PageLayout>
            <Prompt promptName={promptName} version={version} editable={true}></Prompt>

            {/*<PromptTestContainer>*/}
            {/*    <RequiredParamsContainer>*/}
            {/*        {getRequiredParams().map((param: string, index: number) => (*/}
            {/*            <RequireParam key={index}>*/}
            {/*                <div>{param}</div>*/}
            {/*                <input type="text" placeholder={`Enter value for ${param}`} />*/}
            {/*            </RequireParam>*/}
            {/*        ))}*/}
            {/*    </RequiredParamsContainer>*/}
            {/*</PromptTestContainer>*/}
            <AIResponseList version={version} promptName={promptName}/>

        </PageLayout>
    )
}

const PromptTestContainer = styled.div`
    `;

const RequiredParamsContainer = styled.div`
    `;

const RequireParam = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
    height: 3rem;
`;

const Index = styled.div`
    right: 50%;
    bottom: -1rem;
    position: absolute;
`;

const AIResponseContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    height: 22rem;
    column-gap: 1rem;
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

export default PromptDetail;

