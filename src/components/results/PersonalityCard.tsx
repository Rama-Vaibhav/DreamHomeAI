"use client";

import { motion } from "motion/react";
import { HomePersonality } from "@/types";

interface PersonalityCardProps {
  personality: HomePersonality;
}

export function PersonalityCard({ personality }: PersonalityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="personality-card"
      className="relative overflow-hidden rounded-3xl border border-white/10"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${personality.gradient} opacity-20`}
      />
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />

      <div className="relative p-8 md:p-12">
        {/* Emoji + Name */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{personality.emoji}</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {personality.name}
            </h2>
            <p
              className="text-lg font-medium"
              style={{ color: personality.accentColor }}
            >
              {personality.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
          {personality.description}
        </p>

        {/* Traits */}
        <div className="flex flex-wrap gap-3 mb-8">
          {personality.traits.map((trait, i) => (
            <motion.span
              key={trait}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-white/20 bg-white/10 text-white"
            >
              {trait}
            </motion.span>
          ))}
        </div>

        {/* Style Preferences */}
        <div className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-white/40 mb-3">
            Your Style Preferences
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {personality.stylePreferences.map((pref, i) => (
              <motion.div
                key={pref}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 text-white/60"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: personality.accentColor }}
                />
                {pref}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/50 italic text-lg">
            &ldquo;{personality.quote}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}
