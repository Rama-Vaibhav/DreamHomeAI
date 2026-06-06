"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-5xl mb-6">😔</div>
        <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
        <p className="text-white/50 mb-8 max-w-md">
          We hit a bump while loading your results. Let&apos;s try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/quiz"
            className="px-6 py-3 border border-white/20 text-white/60 rounded-xl font-medium hover:border-white/40 transition-colors"
          >
            Retake Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
