"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const superpowers = [
  {
    icon: "🚀",
    title: "0 → 1 Brand Launches",
    description:
      "Built Descipher OS from scratch — GTM strategy, positioning, messaging, and digital presence. I don't just launch products, I create market narratives.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: "🤖",
    title: "AI-Powered Growth",
    description:
      "From AEO/GEO optimization to AI-driven lead gen workflows, I leverage AI as a force multiplier — not a buzzword. Real tools, real results.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: "📊",
    title: "Data-Driven Acquisition",
    description:
      "100+ qualified leads in 6 months. 30% engagement increase. I obsess over metrics, build dashboards, and let data drive every decision.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: "🌍",
    title: "International Expansion",
    description:
      "Expanded into the Middle East market from India. Identifying regional demand, refining entry strategy, and building partnerships across borders.",
    gradient: "from-emerald-400 to-cyan-500",
  },
];

export default function WhatIDo() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="What I Do"
          subtitle="I don't just market — I engineer growth systems"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {superpowers.map((power, index) => (
            <ScrollReveal key={power.title} delay={index * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                <GlassCard className="h-full group cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{power.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                        {power.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">
                        {power.description}
                      </p>
                    </div>
                  </div>
                  {/* Bottom accent line */}
                  <div
                    className={`h-0.5 w-0 group-hover:w-full mt-4 rounded-full bg-gradient-to-r ${power.gradient} transition-all duration-500`}
                  />
                </GlassCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
