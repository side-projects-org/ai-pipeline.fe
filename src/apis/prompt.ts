import axiosInstance from "@common/axios";
import {IPrompt} from "@/types/IPrompt";


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


interface ICreatePrompt {

}


export const createPrompt = async (data: ICreatePrompt): Promise<IPrompt> => {
    const res = await axiosInstance.put("/prompt", data);
    return res.data;
}
