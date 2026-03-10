import dotenv from "dotenv";
dotenv.config();

// Due to billing of open ai , wea are changing to gemini api for llm services. So we are commenting out the open ai code and will implement gemini api in the future.

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export const summarizeText = async (text) => {

//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content: "Summarize the text in 3-6 bullet points under 120 words."
//       },
//       {
//         role: "user",
//         content: text
//       }
//     ]
//   });

//   return response.choices[0].message.content;
// };

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (text) => {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
  });

  const prompt = `
Summarize the following text into 3–6 bullet points under 120 words.

Text:
${text}
`;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  return response.text();
};