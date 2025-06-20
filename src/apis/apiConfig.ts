import {getAllAiResponseByPrompt} from "@apis/ai";

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
    }
}