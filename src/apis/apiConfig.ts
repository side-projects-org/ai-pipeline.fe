import {getAllAIResponseByPrompt} from "@apis/ai";

export const useDummy = {
    prompt: {
        getAllPromptsByName: false,
        getAllPromptByVersion: false,
        getOnePrompt: false,
        createPrompt: false,
    },
    ai: {
        getNewAIResponse: false,
        getAllAIResponse: false,
        getAllAIResponseByPrompt: false,
        // getNewAIResponseStream: false,
    }
}