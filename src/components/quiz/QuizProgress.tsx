"use client";

import { useQuiz } from "./QuizProvider";

export function QuizProgress() {
  const { currentStep, totalSteps } = useQuiz();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white/60">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-white/60">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #2563EB, #7C3AED, #EC4899)",
          }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i <= currentStep
                ? "bg-blue-500 scale-125"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
