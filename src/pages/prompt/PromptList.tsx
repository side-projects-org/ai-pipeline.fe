import React, {useEffect} from "react";
import styled from "styled-components";
import LabeledInput from "@components/atom/LabeledInput";
import {v4 as uuidv4} from "uuid";
import {api} from "@apis/index";
import {useNavigate, useRoutes} from "react-router-dom";


const PromptList: React.FC = () => {
    const navigate = useNavigate();
    // query params 에 값이 있다면, 해당 값으로 기본값 설정
    const query = new URLSearchParams(window.location.search);

    const [promptName, setPromptName] = React.useState<string>(query.get("promptName") || "");
    const [version, setVersion] = React.useState<string>("LATEST");

    const [promptList, setPromptList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [error, setError] = React.useState<string | null>(null);


    useEffect(() => {
        loadingPromptList()
    }, []);

    const loadingPromptList = async () => {
        setLoading(true);
        setError(null);

        const res = await api.prompt.getAllPromptByVersion(version);
        if (promptName.trim().length > 0) {
            const filteredPrompts = res.filter((p: any) => p.prompt_name.includes(promptName));
            setPromptList(filteredPrompts);
        } else {
            setPromptList(res)
        }

        setLoading(false);
    }

    const handlePromptNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromptName(e.target.value);
    }

    const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVersion(e.target.value);
    }

    const handlePromptCardClick = (prompt: any) => {

        navigate(`/prompt/${prompt.prompt_name}`);
    }

    const handleSearch = async () => {
        try {
            await loadingPromptList();
        } catch (err) {
            setError("Failed to fetch prompt list");
        }
    }



    return (
        <PageLayout>
            <div>prompt name: <input value={promptName} onChange={handlePromptNameChange}/></div>
            <button onClick={handleSearch}>Search</button>
            {loading && <Popup>검색중입니다.</Popup>}
            {promptList.map(p => {
                return (
                    <PromptCard onClick={() => handlePromptCardClick(p)}>
                        <div>{p.prompt_name}</div>
                        <div>{p.version}</div>
                        <div>{p.key}</div>
                    </PromptCard>
                )
            })}
        </PageLayout>
    )
}

const PromptCard = styled.div`
    width: 100%;
    height: 100px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;
`;

const PageLayout = styled.div`
    width: 100%;
    height: 100%; /**/
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0;
    // 페이지가 전체가 차게
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 1rem;
`;



export default PromptList;

