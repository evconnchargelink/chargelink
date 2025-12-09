import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "../../utils/async.handler.js";
import { config } from "../../env.config.js";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY!);

// Helper to clean Gemini output
function extractJson(text: string) {
  text = text.replace(/```json|```/g, "").trim();

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in AI response");

  return JSON.parse(match[0]);
}

export const planTrip = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { startPoint, destination, evCarName, batteryCapacity } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Generate JSON only. No markdown, no code fences.

Start: ${startPoint}
Destination: ${destination}
EV: ${evCarName}
Battery: ${batteryCapacity} kWh

Keep distance between locations about an avg of 250 KM only.

Return strictly:

{
  "coordinates": [
    { "lat": number, "lng": number, "name": "string", "description": "string", "waitingTime": number }
  ]
}
`;

    const result = await model.generateContent(prompt);

    // Clean and parse JSON
    let data;
    try {
      const raw = result.response.text();
      data = extractJson(raw);
    } catch (e) {
      console.error("Gemini JSON parse error:", e);
      return res.status(500).json({
        message: "Failed to parse JSON from AI",
      });
    }

    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});
