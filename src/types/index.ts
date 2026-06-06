// ─── Property Types ──────────────────────────────────────────────────────────

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  style: ArchitecturalStyle;
  imageUrl: string;
  tags: string[];
  description: string;
  yearBuilt: number;
  lotSize: string;
  features: string[];
}

export type ArchitecturalStyle =
  | "modern"
  | "traditional"
  | "minimalist"
  | "industrial"
  | "mediterranean";

// ─── Quiz Types ──────────────────────────────────────────────────────────────

export interface QuizAnswers {
  lifestyle: LifestyleType;
  budget: BudgetRange;
  houseSize: HouseSizeRange;
  architecture: ArchitecturalStyle;
  mustHaves: string[];
  workStyle: WorkStyleType;
  weekend: WeekendType;
  goals: GoalsType;
}

export type LifestyleType =
  | "urban-professional"
  | "suburban-family"
  | "nature-lover"
  | "social-butterfly"
  | "creative-spirit";

export type BudgetRange =
  | "200k-400k"
  | "400k-700k"
  | "700k-1m"
  | "1m-2m"
  | "2m-plus";

export type HouseSizeRange =
  | "compact"    // < 1000 sqft
  | "cozy"       // 1000-1500 sqft
  | "comfortable"// 1500-2500 sqft
  | "spacious"   // 2500-4000 sqft
  | "estate";    // 4000+ sqft

export type WorkStyleType =
  | "office-commuter"
  | "remote-worker"
  | "hybrid"
  | "entrepreneur"
  | "freelancer";

export type WeekendType =
  | "outdoor-adventure"
  | "home-chef"
  | "entertainer"
  | "relaxation"
  | "explorer";

export type GoalsType =
  | "investment"
  | "forever-home"
  | "starter-home"
  | "downsizing"
  | "vacation-home";

// ─── Quiz Question Types ────────────────────────────────────────────────────

export interface QuizOption {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: keyof QuizAnswers;
  title: string;
  subtitle: string;
  type: "single" | "multi" | "slider";
  options: QuizOption[];
}

// ─── Personality Types ──────────────────────────────────────────────────────

export interface HomePersonality {
  name: string;
  tagline: string;
  description: string;
  traits: string[];
  stylePreferences: string[];
  quote: string;
  emoji: string;
  gradient: string;
  accentColor: string;
}

// ─── Dream Visual Types ─────────────────────────────────────────────────────

export interface DreamVisual {
  roomType: "bedroom" | "kitchen" | "exterior" | "workspace";
  label: string;
  imageUrl: string;
  prompt?: string;
}

// ─── Matching Types ─────────────────────────────────────────────────────────

export interface MatchCriteria {
  style: ArchitecturalStyle;
  budgetRange: BudgetRange;
  sizeRange: HouseSizeRange;
  lifestyle: LifestyleType;
  mustHaves: string[];
  workStyle: WorkStyleType;
  weekend: WeekendType;
}

export interface MatchBreakdown {
  style: number;
  budget: number;
  lifestyle: number;
  space: number;
  features: number;
}

export interface PropertyMatch {
  property: Property;
  matchScore: number;
  breakdown: MatchBreakdown;
}

// ─── Share Types ────────────────────────────────────────────────────────────

export interface ShareCardData {
  personality: HomePersonality;
  userName?: string;
  dreamVisual?: DreamVisual;
}

// ─── Repository Interface ───────────────────────────────────────────────────

export interface IPropertyRepository {
  getAll(): Promise<Property[]>;
  getById(id: string): Promise<Property | undefined>;
  search(filters: Partial<MatchCriteria>): Promise<Property[]>;
  getByTags(tags: string[]): Promise<Property[]>;
}
