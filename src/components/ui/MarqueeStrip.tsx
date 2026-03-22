"use client";

export default function MarqueeStrip() {
  const items = [
    "GROWTH STRATEGY",
    "AI-LED MARKETING",
    "GTM EXECUTION",
    "AEO & GEO",
    "B2B SALES",
    "FUNNEL OPTIMIZATION",
    "MARKET EXPANSION",
    "BRAND LAUNCH",
    "DATA ANALYTICS",
    "AUTOMATION",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="py-6 overflow-hidden border-y border-[var(--card-border)] my-8">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-bold tracking-[0.2em] text-[var(--muted)] opacity-40 hover:opacity-100 hover:gradient-text transition-opacity duration-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
