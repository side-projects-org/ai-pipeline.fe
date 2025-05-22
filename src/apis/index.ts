import * as promptApi from '@apis/prompt';
import * as aiApi from '@apis/ai';
import dummyPrompt from '@apis/dummy/prompt.json'
import dummyAi from '@apis/dummy/ai.json'
import {useDummy} from "@apis/apiConfig";


type ApiFn = (...args: any[]) => Promise<any>;

function buildProxy<T extends Record<string, ApiFn>>(
    serverApi: T,
    dummyJson: Record<string, any>,
    flags: Record<string, boolean>
): T {
    const result = {} as T;

    for (const key in serverApi) {
        // @ts-ignore
        result[key] = key in flags && flags[key] && dummyJson[key]
            ? () => Promise.resolve(dummyJson[key])
            : serverApi[key] as ApiFn;
    }

    return result;
}

export const api = {
    prompt: buildProxy(promptApi, dummyPrompt, useDummy.prompt),
    ai: buildProxy(aiApi, dummyAi, useDummy.ai),
}