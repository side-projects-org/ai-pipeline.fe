export interface IPrompt {
    item_type: string;
    prompt_name: string;
    version: string;

    params: IAiRequestParams;

    applied_version?: string;
    updated_at: string;  // Date 변환 어떻게?
    created_at: string;  // Date 변환 어떻게?

    best_ai?: string;
    best_model?: string;

    // 굳이?
    pk: string;
    sk: string;
    key: string;
}

export interface IAiMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface IAiRequestParams {
    model: string;
    temperature?: number;
    max_tokens?: number;
    max_completion_tokens?: number;
    messages?: IAiMessage[];
    response_format?: string;
    prompt?: string; // for image generation
}


export interface IAiChoice {
    index: number;
    message: IAiMessage;
    finish_reason?: string;
};

export interface IAiAnswer {
    id: string;
    object?: string;
    created?: number;
    model?: string;
    choices?: IAiChoice[];
    usage?: IGptAiUsage;
}


export interface IGptAiUsage {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;

    completion_tokens_details?: {
        accepted_prediction_tokens?: number;
        audio_tokens?: number;
        reasoning_tokens?: number;
        rejected_prediction_tokens?: number;
    };

    prompt_tokens_details?: {
        audio_tokens?: number;
        cached_tokens?: number;
    };
}

export interface IAiResponse {
    prompt_name: string;
    version: string;
    item_type: string;

    pk: string;
    sk: string;
    key: string;

    created_at: string;

    params: IAiRequestParams;
    answer: IAiAnswer;
    variables: Record<string, any>;
}

export interface IPostLlmRes {
    answer: IAiAnswer;
    params: IAiRequestParams;
}

export interface ICreatePromptReq {
    prompt_name: string;
    version: string;
    messages: IAiMessage[];
    max_tokens: number;
    max_completion_tokens: number;
    model: string;
    response_format: string;
    temperature: number;

    best_ai?: string;
    best_model?: string;
}

export interface ICreatePromptRes extends IPrompt {}