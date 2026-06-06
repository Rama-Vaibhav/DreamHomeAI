"use client";

import { QuizProvider } from "@/components/quiz/QuizProvider";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizStep } from "@/components/quiz/QuizStep";
import Link from "next/link";

export default function QuizPage() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-[#0B1020] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="text-white font-semibold text-lg">Dream Home AI</span>
          </Link>
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            ← Exit Quiz
          </Link>
        </header>

        {/* Quiz Content */}
        <main className="relative z-10 px-6 py-12 md:py-16">
          <QuizProgress />
          <QuizStep />
        </main>
      </div>
    </QuizProvider>
  );
}
