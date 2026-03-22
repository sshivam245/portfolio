"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MetricCard from "@/components/ui/MetricCard";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import { metrics } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="About Me"
          subtitle="The guy who turns 'we need more leads' into a system"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Bio */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                I&apos;m not your typical marketer. I come from a <span className="text-[var(--foreground)] font-medium">tech background</span> —
                B.Sc. in IT, published in IEEE, even did a cybersecurity stint at <span className="text-[var(--foreground)] font-medium">EY</span>.
              </p>
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                Then I discovered my real superpower: <span className="gradient-text font-semibold">turning data into growth</span>.
                Now I build AI-powered acquisition engines, launch brands from zero, and help companies
                crack new markets — with the analytical rigor of an engineer and the hustle of a founder.
              </p>
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                Oh, and I also <span className="text-[var(--foreground)] font-medium">represented India in table tennis</span> at
                the Youth Cup and am a <span className="text-[var(--foreground)] font-medium">Harvard HPAIR 2026 delegate</span>.
                The competitive fire from sports + global perspective from Harvard =
                <span className="gradient-text font-semibold"> growth that&apos;s relentless.</span>
              </p>
            </div>
          </ScrollReveal>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                value={metric.value}
                label={metric.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        <MarqueeStrip />
      </div>
    </section>
  );
}
