import {
  Property,
  MatchCriteria,
  PropertyMatch,
  MatchBreakdown,
  BudgetRange,
  HouseSizeRange,
} from "@/types";
import { properties } from "@/data/properties";

const budgetRanges: Record<BudgetRange, [number, number]> = {
  "200k-400k": [200000, 400000],
  "400k-700k": [400000, 700000],
  "700k-1m": [700000, 1000000],
  "1m-2m": [1000000, 2000000],
  "2m-plus": [2000000, Infinity],
};

const sizeRanges: Record<HouseSizeRange, [number, number]> = {
  compact: [0, 1000],
  cozy: [1000, 1500],
  comfortable: [1500, 2500],
  spacious: [2500, 4000],
  estate: [4000, Infinity],
};

export function getPropertyMatches(criteria: MatchCriteria): PropertyMatch[] {
  const scored = properties.map((property) => {
    const breakdown = scoreProperty(property, criteria);
    const matchScore = calculateTotalScore(breakdown);
    return { property, matchScore, breakdown };
  });

  // Sort by match score descending
  scored.sort((a, b) => b.matchScore - a.matchScore);

  // Return top 5
  return scored.slice(0, 5);
}

function scoreProperty(
  property: Property,
  criteria: MatchCriteria
): MatchBreakdown {
  return {
    style: scoreStyle(property, criteria),
    budget: scoreBudget(property, criteria),
    lifestyle: scoreLifestyle(property, criteria),
    space: scoreSpace(property, criteria),
    features: scoreFeatures(property, criteria),
  };
}

function scoreStyle(property: Property, criteria: MatchCriteria): number {
  // Exact match = 100, related style = 50
  if (property.style === criteria.style) return 100;

  const related: Record<string, string[]> = {
    modern: ["minimalist", "industrial"],
    traditional: ["mediterranean"],
    minimalist: ["modern"],
    industrial: ["modern", "minimalist"],
    mediterranean: ["traditional"],
  };

  if (related[criteria.style]?.includes(property.style)) return 50;
  return 10;
}

function scoreBudget(property: Property, criteria: MatchCriteria): number {
  const [min, max] = budgetRanges[criteria.budgetRange];

  if (property.price >= min && property.price <= max) return 100;

  // Within 20% of range = partial score
  const tolerance = (max === Infinity ? min : max - min) * 0.2;
  if (property.price >= min - tolerance && property.price <= max + tolerance) {
    return 60;
  }

  // Within 40% = low score
  if (
    property.price >= min - tolerance * 2 &&
    property.price <= max + tolerance * 2
  ) {
    return 30;
  }

  return 5;
}

function scoreLifestyle(property: Property, criteria: MatchCriteria): number {
  const lifestyleTags = [criteria.lifestyle, criteria.weekend, criteria.workStyle];
  const matchingTags = lifestyleTags.filter((tag) =>
    property.tags.includes(tag)
  ).length;

  return Math.round((matchingTags / lifestyleTags.length) * 100);
}

function scoreSpace(property: Property, criteria: MatchCriteria): number {
  const [min, max] = sizeRanges[criteria.sizeRange];

  if (property.sqft >= min && property.sqft <= max) return 100;

  // Within 20% tolerance
  const tolerance = (max === Infinity ? min : max - min) * 0.3;
  if (property.sqft >= min - tolerance && property.sqft <= max + tolerance) {
    return 60;
  }

  return 20;
}

function scoreFeatures(property: Property, criteria: MatchCriteria): number {
  if (criteria.mustHaves.length === 0) return 70; // No preference = neutral score

  const matchingFeatures = criteria.mustHaves.filter((feature) =>
    property.features.includes(feature)
  ).length;

  return Math.round((matchingFeatures / criteria.mustHaves.length) * 100);
}

function calculateTotalScore(breakdown: MatchBreakdown): number {
  // Weighted total
  const weights = {
    style: 0.25,
    budget: 0.25,
    lifestyle: 0.2,
    space: 0.15,
    features: 0.15,
  };

  const total =
    breakdown.style * weights.style +
    breakdown.budget * weights.budget +
    breakdown.lifestyle * weights.lifestyle +
    breakdown.space * weights.space +
    breakdown.features * weights.features;

  return Math.round(total);
}
