
export async function generateAIResponse(prompt) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem("openai_api_key");

  if (!apiKey) {
    console.warn("No API key found in environment or localStorage. Using simulated response.");
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve({
          text: `Simulated response: "${prompt}"`,
          contentType: "text",
        }),
        1000
      )
    );
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
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "No response received.";

    return {
      text,
      contentType: "text",
    };
  } catch (error) {
    console.error("OpenAI error:", error);
    return {
      text: `Error generating response: ${error.message}. Please verify your API key and try again.`,
      contentType: "text",
    };
  }
}

// Function to determine content type from prompt
export function determineContentType(prompt) {
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
