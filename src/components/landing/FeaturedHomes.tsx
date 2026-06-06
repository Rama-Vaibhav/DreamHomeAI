"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { properties } from "@/data/properties";

export function FeaturedHomes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Pick 6 diverse featured properties
  const featured = [
    properties[0],  // Modern Penthouse
    properties[4],  // Mediterranean Villa
    properties[2],  // Mountain Retreat
    properties[3],  // Industrial Loft
    properties[5],  // Minimalist Glass House
    properties[8],  // Waterfront Contemporary
  ];

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <section className="py-24 px-6 bg-[#0a0e1a] relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-sm uppercase tracking-widest text-purple-400 mb-3"
          >
            Featured Homes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            Homes that inspire
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Style Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-xs font-medium capitalize">
                    {property.style}
                  </span>
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
                <h3 className="text-white font-semibold text-lg mb-1">{property.title}</h3>
                <p className="text-white/40 text-sm mb-3">{property.location}</p>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <span>{property.beds} bed</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{property.baths} bath</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
