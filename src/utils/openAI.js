// Import the OpenAI library
import OpenAI from "openai";

const openAIKey = import.meta.env.VITE_OPEN_AI_KEY;

const openai = new OpenAI({
  apiKey: openAIKey,
  dangerouslyAllowBrowser: true,
});

export async function getChatGPTAnswer(texto) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: texto,
        },
        {
          role: "system",
          content:
            "Responda com elementos HTML <h3></h3> e <p></p>. Não utilize <ul></ul> nem <ol></ol>.",
        },
      ],
      max_tokens: 500, // Limit the response length
    });

    // Extract and log the response
    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      return "No response received.";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
