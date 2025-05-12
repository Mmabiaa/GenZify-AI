
import { apiService } from "@/services/apiService";
import { errorHandler } from "@/utils/errorHandler";
import appConfig from "@/config/appConfig";
import { determineContentType } from "@/utils/openai.ts";

export async function generateAIResponse(prompt) {
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
      text: `Error generating response: ${error.message}. Please verify your API key and try again.`,
      contentType: "text",
    };
  }
}
