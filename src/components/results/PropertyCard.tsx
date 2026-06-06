"use client";

import { motion } from "motion/react";
import { PropertyMatch } from "@/types";
import Image from "next/image";

interface PropertyCardProps {
  match: PropertyMatch;
  index: number;
}

export function PropertyCard({ match, index }: PropertyCardProps) {
  const { property, matchScore, breakdown } = match;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-blue-400";
    if (score >= 40) return "text-amber-400";
    return "text-white/50";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Match Score Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/70 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <div className="relative w-5 h-5">
              <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke={matchScore >= 70 ? "#10B981" : matchScore >= 50 ? "#3B82F6" : "#F59E0B"}
                  strokeWidth="2"
                  strokeDasharray={`${(matchScore / 100) * 50.3} 50.3`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className={`text-sm font-bold ${getScoreColor(matchScore)}`}>
              {matchScore}%
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-xl">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="text-white font-semibold text-lg mb-1 line-clamp-1">
          {property.title}
        </h4>
        <p className="text-white/40 text-sm mb-3">{property.location}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path d="M1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572z" />
            </svg>
            {property.beds} bed
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </svg>
            {property.baths} bath
          </span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>

        {/* Match Breakdown - Mini Bars */}
        <div className="space-y-1.5">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-white/30 w-14 capitalize">{key}</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${value}%`,
                    backgroundColor:
                      value >= 70 ? "#10B981" : value >= 40 ? "#3B82F6" : "#F59E0B",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://snaphomz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full text-center py-2.5 rounded-xl bg-blue-600/20 text-blue-400 text-sm font-medium hover:bg-blue-600/30 transition-colors"
        >
          View on Snaphomz →
        </a>
      </div>
    </motion.div>
  );
}
