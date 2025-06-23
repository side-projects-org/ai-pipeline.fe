// hi

import {IAiAnswer, IAiResponse} from "@/types/prompt";
import {axiosInstance} from "@common/axios";

export interface IPostAiResponseReq {
    prompt_name: string;
    version: string;
    answer: IAiAnswer;
    variables: Record<string, string>;

}
export const postAiResponse = async ({prompt_name, version, answer, variables}: IPostAiResponseReq): Promise<IAiResponse> => {
    const res = await axiosInstance.post(`/ai-response`, {
        prompt_name,
        version,
        answer,
        variables
    });

    return res.data;
}
