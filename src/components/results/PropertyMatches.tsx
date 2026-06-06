"use client";

import { motion } from "motion/react";
import { PropertyMatch } from "@/types";
import { PropertyCard } from "./PropertyCard";

interface PropertyMatchesProps {
  matches: PropertyMatch[];
}

export function PropertyMatches({ matches }: PropertyMatchesProps) {
  if (matches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">🏠</span>
          Your Top Property Matches
        </h3>
        <span className="text-sm text-white/40">
          Matched from 50 listings
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, i) => (
          <PropertyCard key={match.property.id} match={match} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
