"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const features = [
  {
    title: "AI-Powered",
    description: "Advanced personality analysis maps your lifestyle to architectural styles",
    icon: "🧠",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Personalized Visuals",
    description: "See AI-generated rooms designed specifically for your taste and personality",
    icon: "🎨",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Real Listings",
    description: "Matched with actual properties scored against your personality profile",
    icon: "🏠",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Shareable Results",
    description: "Download your personality card and share your home DNA with friends",
    icon: "🔗",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export function WhyDreamHome() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#0a0e1a] relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm uppercase tracking-widest text-amber-400 mb-3"
          >
            Why Dream Home AI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            More than just a search
          </motion.h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:bg-white/8 transition-all duration-300"
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
