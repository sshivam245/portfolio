"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Education"
          subtitle="Where the foundation was built"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <ScrollReveal key={edu.institution} delay={index * 0.15}>
              <GlassCard className="h-full" hover>
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <h3 className="text-lg font-bold">{edu.institution}</h3>
                  <span className="text-xs text-[var(--muted)] px-3 py-1 rounded-full glass-card">
                    {edu.period}
                  </span>
                </div>
                <p className="text-indigo-400 font-medium text-sm mb-4">
                  {edu.degree}
                </p>
                <ul className="space-y-2">
                  {edu.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--muted)] flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
