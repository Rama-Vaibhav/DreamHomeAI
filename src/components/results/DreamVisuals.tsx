"use client";

import { motion } from "motion/react";
import { DreamVisual } from "@/types";
import { useState } from "react";
import Image from "next/image";

interface DreamVisualsProps {
  visuals: DreamVisual[];
}

export function DreamVisuals({ visuals }: DreamVisualsProps) {
  const [selectedVisual, setSelectedVisual] = useState<DreamVisual | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🎨</span>
          Your Dream Home Visuals
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visuals.map((visual, i) => (
            <motion.div
              key={visual.roomType}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              onClick={() => setSelectedVisual(visual)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
            >
              <Image
                src={visual.imageUrl}
                alt={visual.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-semibold text-lg">{visual.label}</p>
                <p className="text-white/50 text-sm capitalize">{visual.roomType}</p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  Click to expand
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {selectedVisual && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedVisual(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src={selectedVisual.imageUrl}
              alt={selectedVisual.label}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-bold text-2xl">{selectedVisual.label}</p>
            </div>
            <button
              onClick={() => setSelectedVisual(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
