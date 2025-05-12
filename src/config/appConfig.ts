
/**
 * Application configuration
 * This file contains global application settings and configuration
 */

export const appConfig = {
  appName: "GenZify",
  apiEndpoints: {
    openai: "https://api.openai.com/v1/chat/completions",
  },
  defaultModel: "gpt-3.5-turbo",
  apiTimeoutMs: 30000,
  storageKeys: {
    apiKey: "openai_api_key",
    theme: "app_theme",
    user: "user",
  },
  fallbackMessage: "I'm sorry, I couldn't process your request. Please try again later.",
  defaultLanguage: "en",
  maxHistoryLength: 100,
  aiContentTypes: ["text", "video", "document", "voice"] as const,
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
};

export default appConfig;
