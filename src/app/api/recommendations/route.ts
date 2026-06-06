import { NextRequest, NextResponse } from "next/server";
import { getPropertyMatches } from "@/lib/engines/matching-engine";
import { MatchCriteria } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchCriteria } = body as { matchCriteria: MatchCriteria };

    if (!matchCriteria) {
      return NextResponse.json(
        { error: "Missing match criteria" },
        { status: 400 }
      );
    }

    const properties = getPropertyMatches(matchCriteria);

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
