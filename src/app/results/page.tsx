"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HomePersonality, DreamVisual, PropertyMatch, MatchCriteria, QuizAnswers } from "@/types";
import { PersonalityCard } from "@/components/results/PersonalityCard";
import { DreamVisuals } from "@/components/results/DreamVisuals";
import { PropertyMatches } from "@/components/results/PropertyMatches";
import { SharePanel } from "@/components/results/SharePanel";
import { CTABanner } from "@/components/results/CTABanner";

type LoadingStage = "analyzing" | "generating" | "matching" | "complete";

const loadingMessages: Record<LoadingStage, { title: string; subtitle: string; emoji: string }> = {
  analyzing: {
    title: "Analyzing your personality...",
    subtitle: "Our AI is discovering your unique home DNA",
    emoji: "🧠",
  },
  generating: {
    title: "Designing your dream spaces...",
    subtitle: "Creating personalized room visualizations",
    emoji: "🎨",
  },
  matching: {
    title: "Finding your perfect matches...",
    subtitle: "Scoring 50 properties against your profile",
    emoji: "🔍",
  },
  complete: {
    title: "Your dream home awaits!",
    subtitle: "Results are ready",
    emoji: "✨",
  },
};

export default function ResultsPage() {
  const router = useRouter();
  const [loadingStage, setLoadingStage] = useState<LoadingStage>("analyzing");
  const [personality, setPersonality] = useState<HomePersonality | null>(null);
  const [visuals, setVisuals] = useState<DreamVisual[]>([]);
  const [matches, setMatches] = useState<PropertyMatch[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Get quiz answers from sessionStorage
        const savedAnswers = sessionStorage.getItem("dream-home-quiz-final");
        if (!savedAnswers) {
          router.push("/quiz");
          return;
        }

        const answers: QuizAnswers = JSON.parse(savedAnswers);

        // Stage 1: Analyze personality
        setLoadingStage("analyzing");
        const analyzeRes = await fetch("/api/quiz/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });
        const analyzeData = await analyzeRes.json();
        setPersonality(analyzeData.personality);
        const matchCriteria: MatchCriteria = analyzeData.matchCriteria;

        // Stage 2: Generate images
        setLoadingStage("generating");
        const imagesRes = await fetch("/api/generate-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personality: analyzeData.personality,
            style: answers.architecture,
          }),
        });
        const imagesData = await imagesRes.json();
        setVisuals(imagesData.images);

        // Stage 3: Get recommendations
        setLoadingStage("matching");
        const recsRes = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ matchCriteria }),
        });
        const recsData = await recsRes.json();
        setMatches(recsData.properties);

        // Complete
        setLoadingStage("complete");
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to load results:", err);
        setError("Something went wrong. Please try the quiz again.");
      }
    };

    fetchResults();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <Link
            href="/quiz"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Retake Quiz
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    const stage = loadingMessages[loadingStage];
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={loadingStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              {stage.emoji}
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {stage.title}
            </h2>
            <p className="text-white/50">{stage.subtitle}</p>

            {/* Loading dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <span className="text-white font-semibold text-lg">Dream Home AI</span>
        </Link>
        <Link
          href="/quiz"
          className="text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          Retake Quiz →
        </Link>
      </header>

      {/* Results Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Section 1: Personality Card */}
        {personality && <PersonalityCard personality={personality} />}

        {/* Section 2: Dream Visuals */}
        {visuals.length > 0 && <DreamVisuals visuals={visuals} />}

        {/* Section 3: Property Matches */}
        {matches.length > 0 && <PropertyMatches matches={matches} />}

        {/* Section 4: Share Panel */}
        {personality && <SharePanel personality={personality} />}

        {/* Section 5: CTA Banner */}
        <CTABanner />
      </main>
    </div>
  );
}
