import React, {useEffect, useState} from "react";
import {api} from "@apis/index";
import {useNavigate, useParams, useRoutes} from "react-router-dom";
import {useRecoilState} from "recoil";
import {basePromptState} from "@state/BasePromptState";
import styled from "styled-components";
import Prompt from "@components/prompt/Prompt";
import AiResponseList from "@components/prompt/AiResponseList";


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
            <AiResponseList version={version} promptName={promptName}/>

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
    // 페이지가 전체가 차게
`;

export default PromptDetail;

