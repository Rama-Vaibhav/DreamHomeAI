import { HomePersonality, DreamVisual, ArchitecturalStyle } from "@/types";
import { getFallbackImages } from "@/data/fallback-images";

export async function generateDreamVisuals(
  personality: HomePersonality,
  style: ArchitecturalStyle,
): Promise<DreamVisual[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  // If no API key, use fallback images immediately
  if (!apiKey) {
    console.log("No OPENAI_API_KEY found — using fallback images");
    return getFallbackImages(style);
  }

  // Try generating with OpenAI DALL-E
  try {
    const rooms: Array<{ type: DreamVisual["roomType"]; label: string }> = [
      { type: "bedroom", label: "Dream Bedroom" },
      { type: "kitchen", label: "Dream Kitchen" },
      { type: "exterior", label: "Home Exterior" },
      { type: "workspace", label: "Dream Workspace" },
    ];

    const results = await Promise.allSettled(
      rooms.map(async (room) => {
        const prompt = buildImagePrompt(room.type, personality, style);

        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
          }),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const imageUrl = data.data?.[0]?.url;

        if (!imageUrl) {
          throw new Error("No image URL in response");
        }

        return {
          roomType: room.type,
          label: room.label,
          imageUrl,
          prompt,
        } as DreamVisual;
      })
    );

    // Check results — use AI images where successful, fallback where failed
    const fallbacks = getFallbackImages(style);
    const visuals: DreamVisual[] = rooms.map((room, i) => {
      const result = results[i];
      if (result.status === "fulfilled") {
        return result.value;
      }
      console.warn(`DALL-E failed for ${room.type}, using fallback:`, result.reason);
      return fallbacks[i];
    });

    return visuals;
  } catch (error) {
    console.error("OpenAI image generation failed, using fallbacks:", error);
    return getFallbackImages(style);
  }
}

export function buildImagePrompt(
  roomType: string,
  personality: HomePersonality,
  style: ArchitecturalStyle,
): string {
  const styleDescriptions: Record<ArchitecturalStyle, string> = {
    modern: "modern architecture, clean lines, floor-to-ceiling windows, open concept",
    traditional: "traditional architecture, warm wood tones, crown molding, classic details",
    minimalist: "minimalist design, zen aesthetic, neutral palette, clean surfaces",
    industrial: "industrial loft, exposed brick, metal accents, high ceilings",
    mediterranean: "Mediterranean style, arched doorways, terra cotta, warm tones",
  };

  const roomDescriptions: Record<string, string> = {
    bedroom: "luxurious master bedroom with premium bedding and ambient lighting",
    kitchen: "gourmet chef's kitchen with high-end appliances and beautiful countertops",
    exterior: "stunning home exterior with beautiful landscaping and curb appeal",
    workspace: "inspiring home office with natural light and ergonomic design",
  };

  return `A photorealistic ${roomDescriptions[roomType] || roomType} in ${styleDescriptions[style]} style. High-end interior design photography, 4K quality, natural lighting, editorial magazine quality. No text, no watermarks.`;
}
