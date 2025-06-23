import { axiosInstance } from "@common/axios";
import {IAiResponse, IPostLlmRes} from "@/types/prompt";
import AiResponseList from "@components/prompt/AiResponseList";


interface IChatGPTRequest {
    model: string;
    messages: {
        role: string;
        content: string;
    }[];
    temperature: number;
    max_tokens: number;
    max_completion_tokens: number;
}

export const getNewAiResponse = async (data: IChatGPTRequest): Promise<IPostLlmRes> => {
    const res = await axiosInstance.post("/ai/v2", data);

    return res.data;
}


type TGetAiResponseByPromptRes = IAiResponse[];

export const getAllAiResponseByPrompt = async (promptName: string, version: string): Promise<TGetAiResponseByPromptRes> => {
    const res = await axiosInstance.get(`/ai-response`, {
        params: {
            prompt_name: promptName,
            version: version
        }
    });

    return res.data;
}