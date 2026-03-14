import { NextResponse } from "next/server";
import { ai } from "@/lib/aiClient";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic || topic.trim() === "") {
      return NextResponse.json(
        { error: "Please enter a topic." },
        { status: 400 }
      );
    }

    // If API key is missing
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "AI service is currently unavailable because the Gemini API key is not configured.",
        },
        { status: 503 }
      );
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Explain the topic "${topic}" in simple terms for a student.`,
      });

      const explanation = response.text;

      return NextResponse.json({
        topic,
        explanation,
      });
    } catch (aiError) {
      console.error("Gemini API failed:", aiError);

      return NextResponse.json(
        {
          error:
            "AI explanation service is currently unavailable due to API quota limits.",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error occurred." },
      { status: 500 }
    );
  }
}