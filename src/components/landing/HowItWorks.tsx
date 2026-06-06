"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Take the Quiz",
    description: "Answer 8 fun questions about your lifestyle, style, and dream home preferences.",
    icon: "🎯",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "Get AI Visuals",
    description: "See AI-generated room designs personalized to your unique personality and taste.",
    icon: "🎨",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    title: "Find Your Match",
    description: "Discover real property listings that match your personality with scored compatibility.",
    icon: "🏠",
    gradient: "from-amber-500 to-orange-500",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0B1020] relative" ref={ref}>
      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm uppercase tracking-widest text-blue-400 mb-3"
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          Three steps to your dream home
        </motion.h2>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.2 }}
            className="relative group"
          >
            {/* Connection line (between cards) */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 right-0 w-full h-px bg-gradient-to-r from-white/10 to-white/5 translate-x-1/2" />
            )}

            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:bg-white/8 transition-all duration-300">
              {/* Step Number */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} mb-6`}>
                <span className="text-2xl">{step.icon}</span>
              </div>

              {/* Number badge */}
              <div className="absolute top-6 right-6 text-4xl font-bold text-white/5">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-white/50 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
