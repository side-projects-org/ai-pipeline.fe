import React, {useEffect, useState} from "react";
import {api} from "@apis/index";
import {useNavigate, useParams, useRoutes} from "react-router-dom";
import {useRecoilState} from "recoil";
import {basePromptState} from "@state/BasePromptState";


const PromptVersionList: React.FC = () => {
    const navigate = useNavigate();
    // paths variable 에 값이 있다면, 해당 값으로 기본값 설정
    const { promptName, version } = useParams();

    const [prompt, setPrompt] = useState<any>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    const [basePrompt,setBasePrompt] = useRecoilState(basePromptState);

    useEffect(() => {
        loadingPromptDetail();
    }, []);

    const loadingPromptDetail = async () => {
        if (!promptName || !version) {
            return;
        }

        const res = await api.prompt.getAllPromptsByName(promptName);
        if (res.length === 0 || !res.some((p: any) => p.version === version)) {
            alert("해당 프롬프트가 존재하지 않습니다. 이전 페이지로 돌아갑니다.");
            navigate(-1);
            return;
        }

        setPrompt(res.find((p: any) => p.version === version));
        setLoading(false);
    }

    const handlePlaygroundClick = () => {
        setBasePrompt(prompt);
        navigate('/prompt/playground')
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div>{JSON.stringify(prompt, null, 4)}</div>
                    <button onClick={() => navigate(`/prompt/${promptName}`)}>
                        Back to Prompt Versions
                    </button>
                    <button onClick={handlePlaygroundClick}>
                        Playground
                    </button>
                </>
            )}

        </>
    )
}


export default PromptVersionList;

