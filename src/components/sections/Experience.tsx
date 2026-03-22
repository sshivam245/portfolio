"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { experiences } from "@/lib/data";

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative"
    >
      {/* Connector dot */}
      <div className="absolute left-0 md:left-8 top-8 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 z-10 hidden md:block" />
      <div className="absolute left-[5px] md:left-[37px] top-[44px] bottom-0 w-px bg-gradient-to-b from-indigo-500/40 to-transparent hidden md:block" />

      <div className="md:ml-16">
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <GlassCard className="group">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-bold group-hover:gradient-text transition-all duration-300">
                  {experience.role}
                </h3>
                <p className="text-indigo-400 font-medium text-sm">
                  {experience.company}
                </p>
              </div>
              <span className="text-xs text-[var(--muted)] px-3 py-1 rounded-full glass-card font-mono">
                {experience.period}
              </span>
            </div>
            <ul className="space-y-2 mt-4">
              {experience.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="text-sm text-[var(--muted)] flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
            {experience.current && (
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-emerald-400 px-3 py-1 rounded-full glass-card">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Currently building here
              </div>
            )}
            {/* Bottom accent */}
            <div className="h-0.5 w-0 group-hover:w-full mt-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500" />
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="The Journey"
          subtitle="From cybersecurity intern to growth strategist — here's how I got here"
        />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={`${exp.company}-${exp.role}`}
              experience={exp}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
