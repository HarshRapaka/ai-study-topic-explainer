import { NextResponse } from "next/server";
import { ai } from "@/lib/aiClient";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const response: any = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Explain the topic "${topic}" in simple terms for a student.`,
    });

    const explanation = response.text;

    return NextResponse.json({
      explanation,
    });

  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      { explanation: "Failed to fetch explanation. Please try again later." },
      { status: 500 }
    );
  }
}