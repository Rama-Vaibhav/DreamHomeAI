import { NextRequest, NextResponse } from "next/server";
import { analyzePersonality } from "@/lib/engines/personality-engine";
import { QuizAnswers } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers: QuizAnswers = body.answers;

    // Validate required fields
    if (
      !answers?.lifestyle ||
      !answers?.budget ||
      !answers?.houseSize ||
      !answers?.architecture ||
      !answers?.workStyle ||
      !answers?.weekend ||
      !answers?.goals
    ) {
      return NextResponse.json(
        { error: "Missing required quiz answers" },
        { status: 400 }
      );
    }

    const result = analyzePersonality(answers);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Quiz analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze quiz answers" },
      { status: 500 }
    );
  }
}
