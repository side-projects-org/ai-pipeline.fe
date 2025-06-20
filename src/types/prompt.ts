export interface IPrompt {
    item_type: string;
    prompt_name: string;
    version: string;

    params: IAIRequestParams;

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

export interface IAIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface IAIRequestParams {
    model: string;
    temperature?: number;
    max_tokens?: number;
    max_completion_tokens?: number;
    messages?: IAIMessage[];
    response_format?: string;
    prompt?: string; // for image generation
}


export interface IAIChoice {
    index: number;
    message: IAIMessage;
    finish_reason?: string;
};

export interface IGPTAIResponse {
    id: string;
    object?: string;
    created?: number;
    model?: string;
    choices?: IAIChoice[];
    usage?: IGPTAIUsage;
}


export interface IGPTAIUsage {
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

export interface AIResponse {
    prompt_name: string;
    version: string;

    params: IAIRequestParams;

    response: IGPTAIResponse;
}