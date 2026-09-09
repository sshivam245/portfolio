import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-instrument)", "Georgia", "serif"],
      },
      fontSize: {
        // Scale from DESIGN.md
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.65" }],
        h3: ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        h2: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        h1: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        metric: ["2.75rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
