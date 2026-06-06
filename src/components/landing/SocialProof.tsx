"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    personality: "The Urban Visionary",
    avatar: "SC",
    rating: 5,
    text: "I never knew I was an Urban Visionary until this quiz! Found my dream loft in Brooklyn within a week.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Marcus Johnson",
    personality: "The Cozy Nester",
    avatar: "MJ",
    rating: 5,
    text: "The personality card was spot on. My wife and I both took it — we're both Cozy Nesters! No wonder we agree on everything.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Priya Sharma",
    personality: "The Nature Harmonist",
    avatar: "PS",
    rating: 5,
    text: "Shared my results on Twitter and it went viral among my friends. Everyone wants to know their home personality now!",
    gradient: "from-emerald-500 to-green-500",
  },
];

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#0B1020] relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm uppercase tracking-widest text-emerald-400 mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            What people are saying
          </motion.h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.personality}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
