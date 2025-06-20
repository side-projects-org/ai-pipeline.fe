import { axiosInstance } from "@common/axios";
import {ICreatePromptReq, ICreatePromptRes, IPrompt} from "@/types/prompt";


export const getAllPromptsByName = async (promptName: string): Promise<IPrompt[]> => {
    const res = await axiosInstance.get("/prompt", {
        params: {
            prompt_name: promptName
        }
    });

    return res.data;
}

export const getAllPromptByVersion = async (version: string): Promise<IPrompt[]> => {
    const res = await axiosInstance.get("/prompt", {
        params: {
            version: version
        }
    });

    return res.data;
}



export const createPrompt = async (data: ICreatePromptReq): Promise<ICreatePromptRes> => {
    const res = await axiosInstance.put("/prompt", data);
    return res.data;
}
