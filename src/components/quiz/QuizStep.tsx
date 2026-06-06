"use client";

import { motion, AnimatePresence } from "motion/react";
import { useQuiz } from "./QuizProvider";
import { quizQuestions } from "@/data/quiz-questions";
import { QuizAnswers } from "@/types";
import { useRouter } from "next/navigation";

export function QuizStep() {
  const {
    currentStep,
    answers,
    setAnswer,
    nextStep,
    prevStep,
    canProceed,
    submitQuiz,
    isSubmitting,
    totalSteps,
  } = useQuiz();
  const router = useRouter();

  const question = quizQuestions[currentStep];
  if (!question) return null;

  const currentValue = answers[question.id as keyof QuizAnswers];
  const isLastStep = currentStep === totalSteps - 1;

  const handleSelect = (value: string) => {
    if (question.type === "multi") {
      const current = (currentValue as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswer(question.id as keyof QuizAnswers, updated);
    } else {
      setAnswer(question.id as keyof QuizAnswers, value);
      // Auto-advance on single select (small delay for animation)
      if (!isLastStep) {
        setTimeout(() => nextStep(), 400);
      }
    }
  };

  const handleSubmit = async () => {
    await submitQuiz();
    router.push("/results");
  };

  const isSelected = (value: string) => {
    if (question.type === "multi") {
      return ((currentValue as string[]) || []).includes(value);
    }
    return currentValue === value;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-3xl mx-auto"
      >
        {/* Question Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            {question.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60"
          >
            {question.subtitle}
          </motion.p>
          {question.type === "multi" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-blue-400 mt-2"
            >
              Select all that apply
            </motion.p>
          )}
        </div>

        {/* Options Grid */}
        <div
          className={`grid gap-4 ${
            question.options.length <= 5
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          }`}
        >
          {question.options.map((option, i) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => handleSelect(option.value)}
              className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${
                isSelected(option.value)
                  ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              {/* Selection indicator */}
              {isSelected(option.value) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}

              <div className="text-3xl mb-3">{option.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {option.label}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {option.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-10"
        >
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            ← Back
          </button>

          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
                canProceed && !isSubmitting
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Discover My Dream Home →"
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
                canProceed
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              {question.type === "multi" ? "Continue →" : "Next →"}
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
