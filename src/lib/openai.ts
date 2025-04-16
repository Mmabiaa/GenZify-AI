// src/lib/openai.ts

import { toast } from "@/hooks/use-toast"

export const generateAIResponse = async (
  prompt: string,
  apiKey: string | null
): Promise<{ text: string; contentType: "text" | "voice" | "video" | "document" }> => {
  // Fallback to mock if no key
  if (!apiKey) {
    return mockAIResponse(prompt)
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates text, documents, video scripts, or voice content.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || "Error calling OpenAI API")
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ""

    // Detect type
    const lower = prompt.toLowerCase()
    let contentType: "text" | "voice" | "video" | "document" = "text"
    if (lower.includes("video") || lower.includes("script")) contentType = "video"
    else if (lower.includes("document") || lower.includes("report")) contentType = "document"
    else if (lower.includes("voice") || lower.includes("speech")) contentType = "voice"

    return { text: content, contentType }
  } catch (error: any) {
    toast({
      title: "OpenAI API Error",
      description: error.message,
      variant: "destructive",
    })
    return mockAIResponse(prompt)
  }
}

// Basic fallback response
const mockAIResponse = (
  input: string
): { text: string; contentType: "text" | "voice" | "video" | "document" } => ({
  text: `⚠️ Unable to fetch from OpenAI. Here's a mock response for your input:\n\n"${input}"`,
  contentType: "text",
})
