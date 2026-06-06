"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { QuizAnswers } from "@/types";

interface QuizState {
  currentStep: number;
  answers: Partial<QuizAnswers>;
  isSubmitting: boolean;
  isComplete: boolean;
}

interface QuizContextType extends QuizState {
  setAnswer: (key: keyof QuizAnswers, value: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  submitQuiz: () => Promise<void>;
  canProceed: boolean;
  totalSteps: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const TOTAL_STEPS = 8;
const STORAGE_KEY = "dream-home-quiz-answers";

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    answers: {},
    isSubmitting: false,
    isComplete: false,
  });

  // Restore from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          answers: parsed.answers || {},
          currentStep: parsed.currentStep || 0,
        }));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answers: state.answers,
          currentStep: state.currentStep,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, [state.answers, state.currentStep]);

  const stepKeys: (keyof QuizAnswers)[] = [
    "lifestyle",
    "budget",
    "houseSize",
    "architecture",
    "mustHaves",
    "workStyle",
    "weekend",
    "goals",
  ];

  const setAnswer = useCallback(
    (key: keyof QuizAnswers, value: string | string[]) => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [key]: value },
      }));
    },
    []
  );

  const canProceed = (() => {
    const currentKey = stepKeys[state.currentStep];
    if (!currentKey) return false;
    const value = state.answers[currentKey];
    if (currentKey === "mustHaves") {
      return Array.isArray(value) && value.length > 0;
    }
    return !!value;
  })();

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, TOTAL_STEPS - 1),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, TOTAL_STEPS - 1)),
    }));
  }, []);

  const submitQuiz = useCallback(async () => {
    setState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      // Store the final answers in sessionStorage for the results page
      sessionStorage.setItem(
        "dream-home-quiz-final",
        JSON.stringify(state.answers)
      );
      setState((prev) => ({ ...prev, isComplete: true, isSubmitting: false }));
    } catch (error) {
      console.error("Quiz submission error:", error);
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [state.answers]);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        setAnswer,
        nextStep,
        prevStep,
        goToStep,
        submitQuiz,
        canProceed,
        totalSteps: TOTAL_STEPS,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
