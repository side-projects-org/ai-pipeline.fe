import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import PromptViewer from "@components/prompt/PromptViewer";
import AiResponseList from "@components/prompt/AiResponseList";
import {api} from "@apis/index";
import {IAiResponse, IPrompt} from "@/types/prompt";


const PromptDetail: React.FC = () => {
    const navigate = useNavigate();
    // paths variable 에 값이 있다면, 해당 값으로 기본값 설정
    const {promptName, version} = useParams();
    const [prompt, setPrompt] = React.useState<IPrompt | null>(null);
    const [aiResponseList, setAiResponseList] = React.useState<IAiResponse[] | null>(null);

    const getPromptDetail = async (promptName: string, version: string) => {
        if (!promptName || !version) {
            return;
        }

        // TODO 단건 조회 API 로 변경해야함
        const res = await api.prompt.getAllPromptsByName(promptName);
        if (res.length === 0 || !res.some((p: any) => p.version === version)) {
            alert("해당 프롬프트가 존재하지 않습니다. 이전 페이지로 돌아갑니다.");
            return;
        }

        console.log('res', res)

        const matched: any = res.find((p: any) => p.version === version)

        console.log('matched', matched)
        return matched;
    }

    const getAiResponseList = async (promptName: string, version: string) => {
        if (!promptName || !version) {
            return [];
        }

        // TODO 단건 조회 API 로 변경해야함
        return await api.ai.getAllAiResponseByPrompt(promptName, version);
    }

    const handleRunComplete = async () => {
        if (!promptName || !version) return;

        const updated = await getAiResponseList(promptName, version);
        setAiResponseList(updated);
    };

    useEffect(() => {
        if (!promptName || !version) {
            alert("프롬프트 이름과 버전을 확인해주세요.");
            navigate('/prompt');
            return;
        }

        getPromptDetail(promptName, version)
            .then(setPrompt);

        getAiResponseList(promptName, version)
            .then(setAiResponseList);
    }, []);

    return (
        <PageLayout>
            {prompt && <PromptViewer prompt={prompt} onRunComplete={handleRunComplete}/>}
            {aiResponseList && <AiResponseList data={aiResponseList}/>}
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

