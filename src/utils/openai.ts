
import { apiService } from "@/services/apiService";
import { errorHandler } from "@/utils/errorHandler";
import appConfig from "@/config/appConfig";
import { AIResponse } from "@/types";

export async function generateAIResponse(prompt: string): Promise<AIResponse> {
  const apiKey = apiService.getApiKey();

  if (!apiKey) {
    console.warn("No API key found. Using simulated response.");
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve({
          text: `Simulated response: "${prompt}"`,
          contentType: determineContentType(prompt),
        }),
        1000
      )
    );
  }

  try {
    const response = await apiService.fetchWithTimeout(
      appConfig.apiEndpoints.openai, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: appConfig.defaultModel,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "No response received.";

    return {
      text,
      contentType: determineContentType(prompt),
    };
  } catch (error) {
    errorHandler.handle(error, "AI Response Generation");
    return {
      text: `Error generating response: ${error instanceof Error ? error.message : 'Unknown error'}. Please verify your API key and try again.`,
      contentType: "text",
    };
  }
}

// Function to determine content type from prompt
export function determineContentType(prompt: string): "text" | "video" | "document" | "voice" {
  const prompt_lower = prompt.toLowerCase();
  
  // Check for video content request
  if (
    prompt_lower.includes("create a video") ||
    prompt_lower.includes("generate a video") ||
    prompt_lower.includes("video script") ||
    prompt_lower.includes("make a video")
  ) {
    return "video";
  }
  
  // Check for document request
  if (
    prompt_lower.includes("write a document") ||
    prompt_lower.includes("create a document") ||
    prompt_lower.includes("generate a report") ||
    prompt_lower.includes("make a document")
  ) {
    return "document";
  }
  
  // Check for voice content request
  if (
    prompt_lower.includes("create voice") ||
    prompt_lower.includes("generate speech") ||
    prompt_lower.includes("voice over") ||
    prompt_lower.includes("audio script")
  ) {
    return "voice";
  }
  
  // Default to text
  return "text";
}
