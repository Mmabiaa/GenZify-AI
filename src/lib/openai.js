export async function generateAIResponse(prompt, apiKey) {
  if (!apiKey) {
    // Simulate a fake response for testing (when no key is provided)
    return new Promise((resolve) =>
      setTimeout(
        () =>
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
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content || "No response received.";

    return {
      text,
      contentType: "text",
    };
  } catch (error) {
    console.error("Error generating AI response:", error);
    return {
      text: "Something went wrong while generating a response.",
      contentType: "text",
    };
  }
}
