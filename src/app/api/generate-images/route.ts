import { NextRequest, NextResponse } from "next/server";
import { generateDreamVisuals } from "@/lib/services/image-service";
import { HomePersonality, ArchitecturalStyle } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personality, style } = body as {
      personality: HomePersonality;
      style: ArchitecturalStyle;
    };

    if (!personality || !style) {
      return NextResponse.json(
        { error: "Missing personality or style" },
        { status: 400 }
      );
    }

    const images = await generateDreamVisuals(personality, style);

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 }
    );
  }
}
