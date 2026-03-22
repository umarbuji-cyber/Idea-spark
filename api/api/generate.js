export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-mini",
        messages: [
          { role: "user", content: "Generate a creative startup idea" }
        ]
      }),
    });

    const data = await response.json();

    res.status(200).json({
      idea: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to generate idea",
      details: error.message
    });
  }
}