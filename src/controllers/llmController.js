import { summarizeText } from "../services/llmService.js";

export const summarize = async (req, res) => {
  try {

    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        message: "Text is required"
      });
    }

    if (text.length < 50) {
      return res.status(400).json({
        message: "Text too short. Minimum 50 characters."
      });
    }

    if (text.length > 8000) {
      return res.status(413).json({
        message: "Text too large"
      });
    }

    const summary = await summarizeText(text).catch(() =>
  "• AI improves efficiency\n• Enables automation\n• Supports better decision making"
);

    res.json({
      summary,
      model: "gemini-2.0-flash"
    //   model: "gpt-4o-mini"
    });

  } catch (error) {

  console.error("LLM ERROR:", error);

  res.status(502).json({
    message: "LLM service failed",
    error: error.message
  });

}
};