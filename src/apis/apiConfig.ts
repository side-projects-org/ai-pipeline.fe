import {getAllAiResponseByPrompt} from "@apis/ai";
import {postAiResponse} from "@apis/aiResponse";

export const useDummy = {
    prompt: {
        getAllPromptsByName: false,
        getAllPromptByVersion: false,
        getOnePrompt: false,
        createPrompt: false,
    },
    ai: {
        getNewAiResponse: false,
        getAllAiResponse: false,
        getAllAiResponseByPrompt: false,
    },
    aiResponse: {
        postAiResponse: false,
    },
}