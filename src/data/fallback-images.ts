import { DreamVisual, ArchitecturalStyle, LifestyleType } from "@/types";

type FallbackKey = `${ArchitecturalStyle}-${LifestyleType}`;

// Curated high-quality Unsplash images mapped to style + lifestyle combinations
const fallbackImageMap: Record<string, Record<string, string>> = {
  bedroom: {
    "modern": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    "traditional": "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    "minimalist": "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80",
    "industrial": "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    "mediterranean": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
  kitchen: {
    "modern": "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80",
    "traditional": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    "minimalist": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    "industrial": "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80",
    "mediterranean": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  },
  exterior: {
    "modern": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "traditional": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "minimalist": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "industrial": "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    "mediterranean": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  workspace: {
    "modern": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    "traditional": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    "minimalist": "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80",
    "industrial": "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=800&q=80",
    "mediterranean": "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80",
  },
};

export function getFallbackImages(style: ArchitecturalStyle): DreamVisual[] {
  const rooms: Array<{ type: DreamVisual["roomType"]; label: string }> = [
    { type: "bedroom", label: "Dream Bedroom" },
    { type: "kitchen", label: "Dream Kitchen" },
    { type: "exterior", label: "Home Exterior" },
    { type: "workspace", label: "Dream Workspace" },
  ];

  return rooms.map((room) => ({
    roomType: room.type,
    label: room.label,
    imageUrl: fallbackImageMap[room.type]?.[style] || fallbackImageMap[room.type]?.["modern"] || "",
  }));
}

export { fallbackImageMap };
