export const STORAGE_KEY = {
  MODELS: "models",
  CURRENT_MODEL: "current_model",
  OPENAI_API_KEY: "openai_api_key",
};

export const MODELS: {[key: string]: any} = {
  "gpt-3.5-turbo": {
    name: "gpt-3.5-turbo",
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    total_tokens: 4096,
    max_tokens: 1000,
    temperature: 0.7,
    top_p: 1.0,
  },
  "gpt-3.5-turbo-16k": {
    name: "gpt-3.5-16k",
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    total_tokens: 16384,
    max_tokens: 4000,
    temperature: 0.7,
    top_p: 1.0,
  },
  "gpt-4-32k": {
    name: "gpt-4-32k",
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    total_tokens: 32768,
    max_tokens: 8000,
    temperature: 0.7,
    top_p: 1.0,
  },
  "gpt-4": {
    name: "gpt-4",
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    total_tokens: 8192,
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1.0,
  },
  "gpt-4-1106-preview": {
    name: "gpt-4-1106-preview",
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    total_tokens: 4096,
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1.0,
  },
  "gpt-4o": {
    name: "gpt-4o",
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    total_tokens: 4096,
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1.0,
  },
};

export const DEFAULT_MODEL_NAME: string = "gpt-3.5-turbo";
