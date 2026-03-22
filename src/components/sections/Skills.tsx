"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { skillCategories } from "@/lib/data";

const categoryMeta: Record<string, { icon: string; color: string }> = {
  "Growth & GTM": { icon: "🚀", color: "from-indigo-500 to-purple-500" },
  "Marketing Tools": { icon: "🛠️", color: "from-purple-500 to-pink-500" },
  "Data & Analytics": { icon: "📊", color: "from-cyan-400 to-blue-500" },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="My Arsenal"
          subtitle="The tools & strategies in my growth toolkit"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => {
            const meta = categoryMeta[category.name] || { icon: "⚡", color: "from-indigo-500 to-cyan-400" };
            return (
              <ScrollReveal key={category.name} delay={catIndex * 0.15}>
                <GlassCard className="h-full group" hover>
                  <div className="text-3xl mb-3">{meta.icon}</div>
                  <h3 className="text-lg font-bold mb-5 gradient-text inline-block">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium glass-card border-l-2 border-indigo-500/50 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  {/* Accent bar */}
                  <div className={`h-0.5 w-0 group-hover:w-full mt-5 rounded-full bg-gradient-to-r ${meta.color} transition-all duration-500`} />
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
