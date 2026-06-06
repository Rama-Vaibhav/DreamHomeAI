import { QuizAnswers, HomePersonality, MatchCriteria } from "@/types";
import { personalities, PersonalityDefinition } from "@/data/personalities";

interface PersonalityScore {
  personality: PersonalityDefinition;
  score: number;
}

export function analyzePersonality(answers: QuizAnswers): {
  personality: HomePersonality;
  matchCriteria: MatchCriteria;
} {
  // Score each personality based on quiz answers
  const scores: PersonalityScore[] = personalities.map((p) => {
    let score = 0;

    // Lifestyle match (weight: 25%)
    if (p.matchRules.lifestyles.includes(answers.lifestyle)) {
      score += 25;
    }

    // Architecture match (weight: 25%)
    if (p.matchRules.architectures.includes(answers.architecture)) {
      score += 25;
    }

    // Weekend match (weight: 20%)
    if (p.matchRules.weekends.includes(answers.weekend)) {
      score += 20;
    }

    // Work style match (weight: 15%)
    if (p.matchRules.workStyles.includes(answers.workStyle)) {
      score += 15;
    }

    // Must-haves bonus (weight: up to 15%)
    const relevantFeatures = getRelevantFeatures(p.name);
    const featureOverlap = answers.mustHaves.filter((f) =>
      relevantFeatures.includes(f)
    ).length;
    score += Math.min(15, featureOverlap * 5);

    return { personality: p, score };
  });

  // Sort by score and get the best match
  scores.sort((a, b) => b.score - a.score);
  const bestMatch = scores[0].personality;

  // Build match criteria from answers
  const matchCriteria: MatchCriteria = {
    style: answers.architecture,
    budgetRange: answers.budget,
    sizeRange: answers.houseSize,
    lifestyle: answers.lifestyle,
    mustHaves: answers.mustHaves,
    workStyle: answers.workStyle,
    weekend: answers.weekend,
  };

  // Return personality without matchRules (clean interface)
  const personality: HomePersonality = {
    name: bestMatch.name,
    tagline: bestMatch.tagline,
    description: bestMatch.description,
    traits: bestMatch.traits,
    stylePreferences: bestMatch.stylePreferences,
    quote: bestMatch.quote,
    emoji: bestMatch.emoji,
    gradient: bestMatch.gradient,
    accentColor: bestMatch.accentColor,
  };

  return { personality, matchCriteria };
}

function getRelevantFeatures(personalityName: string): string[] {
  const featureMap: Record<string, string[]> = {
    "The Urban Visionary": ["smart-home", "gym", "home-office", "open-kitchen"],
    "The Cozy Nester": ["fireplace", "garden", "open-kitchen", "walk-in-closet"],
    "The Nature Harmonist": ["garden", "outdoor-deck", "fireplace"],
    "The Luxe Curator": ["pool", "gym", "walk-in-closet", "smart-home"],
    "The Minimalist Sage": ["home-office", "garden"],
    "The Creative Maverick": ["home-office", "open-kitchen"],
    "The Social Architect": ["open-kitchen", "outdoor-deck", "pool", "garden"],
    "The Tech Pioneer": ["smart-home", "home-office", "gym"],
    "The Wellness Dweller": ["gym", "pool", "garden", "outdoor-deck"],
    "The Heritage Keeper": ["fireplace", "garden", "outdoor-deck", "walk-in-closet"],
  };
  return featureMap[personalityName] || [];
}
