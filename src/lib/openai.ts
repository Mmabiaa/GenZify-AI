export async function generateAIResponse(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 600,
      temperature: 0.7,
    }),
  })

  const data = await response.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices[0].text.trim()
}
