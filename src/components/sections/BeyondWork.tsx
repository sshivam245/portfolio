"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const highlights = [
  {
    icon: "🏓",
    title: "National Table Tennis Player",
    subtitle: "Represented India — Youth Cup",
    description:
      "Competed at the international level representing India in the Youth Cup. The discipline, quick thinking, and competitive edge from professional sports is something I bring to every growth challenge.",
    tag: "SPORTS",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: "🎓",
    title: "HPAIR Delegate 2026",
    subtitle: "Harvard Project for Asian & International Relations",
    description:
      "Selected as a delegate for HPAIR — Harvard's premier conference connecting future leaders across Asia and the world. Engaging with global perspectives on business, policy, and innovation.",
    tag: "LEADERSHIP",
    gradient: "from-red-500 to-purple-500",
  },
];

export default function BeyondWork() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Beyond the Desk"
          subtitle="Growth isn't just a career — it's a mindset"
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GlassCard className="h-full group relative overflow-hidden">
                  {/* Background accent glow */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{item.icon}</div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 px-2 py-1 rounded-full glass-card">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-1 group-hover:gradient-text transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-indigo-400 text-sm font-medium mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bottom accent */}
                    <div
                      className={`h-0.5 w-0 group-hover:w-full mt-5 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-500`}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
