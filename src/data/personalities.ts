import { HomePersonality } from "@/types";

export interface PersonalityDefinition extends HomePersonality {
  matchRules: {
    lifestyles: string[];
    architectures: string[];
    weekends: string[];
    workStyles: string[];
  };
}

export const personalities: PersonalityDefinition[] = [
  {
    name: "The Urban Visionary",
    tagline: "Where innovation meets skyline",
    description:
      "You thrive in the pulse of the city. Your dream home is a modern penthouse or loft with panoramic views, smart home tech, and spaces that spark creativity. You value design-forward living.",
    traits: ["Innovative", "Connected", "Design-Forward", "Ambitious"],
    stylePreferences: ["Modern architecture", "Smart home integration", "Open floor plans", "City views"],
    quote: "Home is where the future lives.",
    emoji: "🏙️",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    accentColor: "#2563EB",
    matchRules: {
      lifestyles: ["urban-professional", "social-butterfly"],
      architectures: ["modern", "industrial"],
      weekends: ["explorer", "entertainer"],
      workStyles: ["remote-worker", "entrepreneur"],
    },
  },
  {
    name: "The Cozy Nester",
    tagline: "Warmth in every corner",
    description:
      "Your home is your sanctuary. You dream of warm wood tones, a crackling fireplace, and a kitchen that's always filled with the aroma of something delicious. Comfort is your love language.",
    traits: ["Nurturing", "Warm", "Traditional", "Family-Oriented"],
    stylePreferences: ["Traditional charm", "Warm interiors", "Fireplace", "Family spaces"],
    quote: "The best things in life happen at home.",
    emoji: "🏡",
    gradient: "from-amber-500 via-orange-400 to-yellow-300",
    accentColor: "#F59E0B",
    matchRules: {
      lifestyles: ["suburban-family"],
      architectures: ["traditional"],
      weekends: ["home-chef", "relaxation"],
      workStyles: ["hybrid", "office-commuter"],
    },
  },
  {
    name: "The Nature Harmonist",
    tagline: "Living in sync with the earth",
    description:
      "You find peace in natural surroundings. Your dream home blends seamlessly with nature — large windows framing forest views, sustainable materials, and gardens that feel like extensions of the wild.",
    traits: ["Peaceful", "Eco-Conscious", "Grounded", "Adventurous"],
    stylePreferences: ["Natural materials", "Large windows", "Garden spaces", "Sustainability"],
    quote: "In every walk with nature, one receives far more than he seeks.",
    emoji: "🌿",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
    accentColor: "#10B981",
    matchRules: {
      lifestyles: ["nature-lover"],
      architectures: ["traditional", "mediterranean"],
      weekends: ["outdoor-adventure", "relaxation"],
      workStyles: ["remote-worker", "freelancer"],
    },
  },
  {
    name: "The Luxe Curator",
    tagline: "Only the finest will do",
    description:
      "You have exquisite taste and appreciate the finer things. Your dream home features premium finishes, spa-like bathrooms, a wine cellar, and spaces that feel like a five-star resort.",
    traits: ["Refined", "Elegant", "Quality-Driven", "Sophisticated"],
    stylePreferences: ["Premium finishes", "Spa bathrooms", "Wine cellar", "Resort-style pool"],
    quote: "Luxury is in each detail.",
    emoji: "👑",
    gradient: "from-purple-600 via-violet-500 to-fuchsia-400",
    accentColor: "#7C3AED",
    matchRules: {
      lifestyles: ["urban-professional", "social-butterfly"],
      architectures: ["modern", "mediterranean"],
      weekends: ["entertainer", "explorer"],
      workStyles: ["entrepreneur"],
    },
  },
  {
    name: "The Minimalist Sage",
    tagline: "Less is the ultimate luxury",
    description:
      "You believe in intentional living. Your dream home is clean, uncluttered, and every item has purpose. Think Japanese-inspired zen, neutral palettes, and spaces that breathe.",
    traits: ["Intentional", "Calm", "Focused", "Mindful"],
    stylePreferences: ["Clean lines", "Neutral palette", "Zen spaces", "Functional design"],
    quote: "Simplicity is the ultimate sophistication.",
    emoji: "🧘",
    gradient: "from-slate-600 via-gray-500 to-zinc-400",
    accentColor: "#64748B",
    matchRules: {
      lifestyles: ["nature-lover", "creative-spirit"],
      architectures: ["minimalist"],
      weekends: ["relaxation"],
      workStyles: ["remote-worker", "freelancer"],
    },
  },
  {
    name: "The Creative Maverick",
    tagline: "Where art meets architecture",
    description:
      "Your home is your canvas. You dream of converted lofts, exposed brick, studio spaces, and rooms that double as galleries. Every wall tells a story, every corner inspires.",
    traits: ["Artistic", "Bold", "Unconventional", "Expressive"],
    stylePreferences: ["Industrial loft", "Studio space", "Gallery walls", "Unique layouts"],
    quote: "Creativity is intelligence having fun.",
    emoji: "🎨",
    gradient: "from-rose-600 via-pink-500 to-red-400",
    accentColor: "#E11D48",
    matchRules: {
      lifestyles: ["creative-spirit"],
      architectures: ["industrial", "modern"],
      weekends: ["explorer"],
      workStyles: ["freelancer", "entrepreneur"],
    },
  },
  {
    name: "The Social Architect",
    tagline: "Built for togetherness",
    description:
      "Your home is the neighborhood hub. You dream of open-concept living, a gourmet kitchen island, outdoor entertaining spaces, and guest rooms that make everyone feel welcome.",
    traits: ["Hospitable", "Energetic", "Community-Focused", "Generous"],
    stylePreferences: ["Open concept", "Gourmet kitchen", "Entertainment deck", "Guest suites"],
    quote: "The more, the merrier — and the bigger the kitchen, the better.",
    emoji: "🎉",
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    accentColor: "#EA580C",
    matchRules: {
      lifestyles: ["social-butterfly", "suburban-family"],
      architectures: ["traditional", "mediterranean"],
      weekends: ["entertainer", "home-chef"],
      workStyles: ["hybrid", "office-commuter"],
    },
  },
  {
    name: "The Tech Pioneer",
    tagline: "Smart living, redefined",
    description:
      "You live at the cutting edge. Your dream home is fully automated — voice-controlled everything, solar panels, EV charging, and a home office that rivals Silicon Valley headquarters.",
    traits: ["Forward-Thinking", "Efficient", "Tech-Savvy", "Progressive"],
    stylePreferences: ["Smart automation", "Solar/green tech", "EV ready", "High-speed connectivity"],
    quote: "The home of tomorrow, today.",
    emoji: "🤖",
    gradient: "from-cyan-600 via-blue-500 to-indigo-400",
    accentColor: "#0891B2",
    matchRules: {
      lifestyles: ["urban-professional"],
      architectures: ["modern", "minimalist"],
      weekends: ["explorer"],
      workStyles: ["remote-worker", "entrepreneur"],
    },
  },
  {
    name: "The Wellness Dweller",
    tagline: "Home is your healing space",
    description:
      "Your home nurtures mind, body, and soul. You dream of meditation rooms, home gyms, spa bathrooms, organic gardens, and spaces flooded with natural light.",
    traits: ["Health-Conscious", "Balanced", "Serene", "Holistic"],
    stylePreferences: ["Meditation room", "Home gym", "Spa bathroom", "Natural light"],
    quote: "A healthy home breeds a healthy life.",
    emoji: "🌸",
    gradient: "from-teal-500 via-emerald-400 to-green-300",
    accentColor: "#14B8A6",
    matchRules: {
      lifestyles: ["nature-lover", "suburban-family"],
      architectures: ["minimalist", "mediterranean"],
      weekends: ["outdoor-adventure", "relaxation"],
      workStyles: ["remote-worker", "hybrid"],
    },
  },
  {
    name: "The Heritage Keeper",
    tagline: "Where history meets heart",
    description:
      "You appreciate timeless design and stories embedded in walls. Your dream home features crown molding, hardwood floors, a wrap-around porch, and rooms with character and soul.",
    traits: ["Classic", "Thoughtful", "Nostalgic", "Steadfast"],
    stylePreferences: ["Crown molding", "Hardwood floors", "Character details", "Wrap-around porch"],
    quote: "A house with character is a house with stories.",
    emoji: "🏰",
    gradient: "from-stone-600 via-amber-700 to-yellow-600",
    accentColor: "#92400E",
    matchRules: {
      lifestyles: ["suburban-family"],
      architectures: ["traditional"],
      weekends: ["home-chef", "relaxation"],
      workStyles: ["office-commuter", "hybrid"],
    },
  },
];
