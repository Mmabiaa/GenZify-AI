
// Message types for chat interactions
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
  contentType?: "text" | "video" | "document" | "voice";
}

// Response types for AI generation
export interface AIResponse {
  text: string;
  contentType: "text" | "video" | "document" | "voice";
}

// User types for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Settings types
export interface AppSettings {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  language: string;
}

// Environment variables type definition
export interface EnvVariables {
  VITE_OPENAI_API_KEY?: string;
}
