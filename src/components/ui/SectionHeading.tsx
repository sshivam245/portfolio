"use client";

import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <ScrollReveal className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </ScrollReveal>
  );
}
