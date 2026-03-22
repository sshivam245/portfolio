"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { publications } from "@/lib/data";

const publisherMeta: Record<string, { icon: string; tag: string }> = {
  "Taylor & Francis": { icon: "📖", tag: "Book Chapter" },
  "Government of India": { icon: "🏛️", tag: "Patent/Copyright" },
  "IEEE Xplore": { icon: "🔬", tag: "Research Paper" },
};

export default function Publications() {
  return (
    <section id="publications" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Published Work"
          subtitle="Not just a marketer — also a published researcher and author"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {publications.map((pub, index) => {
            const meta = publisherMeta[pub.publisher] || { icon: "📄", tag: "Publication" };
            return (
              <ScrollReveal key={pub.title} delay={index * 0.15}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                  <GlassCard className="h-full group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{meta.icon}</div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 px-2 py-1 rounded-full glass-card">
                        {meta.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-2 leading-snug group-hover:gradient-text transition-all duration-300">
                      {pub.title}
                    </h3>
                    <p className="text-indigo-400 text-sm font-medium mb-3">
                      {pub.publisher}
                    </p>
                    <p className="text-sm text-[var(--muted)]">{pub.description}</p>
                    {/* Bottom accent */}
                    <div className="h-0.5 w-0 group-hover:w-full mt-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500" />
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
