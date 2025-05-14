

/*
{
      "key": "key-1",
      "name": "Prompt 1",
      "writer": "Writer 1",
      "description": "This is a description for Prompt 1",
      "messages": [
        {
          "role": "user",
          "content": "What is the capital of France?"
        },
        {
          "role": "assistant",
          "content": "The capital of France is Paris."
        }
      ],
      "max_tokens": 3000,
      "temperature": 0.7,
      "model": "gpt-3.5-turbo",
      "response_format": "text"
    },
 */

interface IPrompt {
    key: string;
    name: string;
    writer: string;
    description: string;
    messages: {
        role: string;
        content: string;
    }[];
    max_tokens: number;
    temperature: number;
    model: string;
    response_format: string;
}

export const getPrompts = async (): Promise<IPrompt[]> => {
    const res = await fetch("/prompt");
    return res.json();
}


interface ICreatePrompt {
    name: string;
    writer: string;
    description: string;
    messages: {
        role: string;
        content: string;
    }[];
    max_tokens: number;
    temperature: number;
    model: string;
    response_format: string;
}


export const createPrompt = async (data: ICreatePrompt): Promise<IPrompt> => {
    const res = await fetch("/prompt");
    return res.json();
}

export const getSample = async (domain: string): Promise<any> => {
    const res = await fetch(domain);
    return res.json();
}