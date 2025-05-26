import { axiosInstance } from "@common/axios";


interface IChatGPTRequest {
    model: string;
    messages: {
        role: string;
        content: string;
    }[];
    temperature: number;
    max_tokens: number;
}

export const getNewAIResponse = async (data: IChatGPTRequest): Promise<any> => {
    const res = await axiosInstance.post("/ai/v2", data);

    return res.data;
}