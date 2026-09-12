import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    /*
     * Compiles `hover:` to @media (hover: hover). Without it a tap on touch
     * leaves the hover state stuck on, because the device reports a hover it
     * cannot undo. 17 hover utilities across 7 files were affected.
     */
    hoverOnlyWhenSupported: true,
  },
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
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-instrument)", "Georgia", "serif"],
      },
      fontSize: {
        // Only the small end lives here; headings use the .t-*
        // component classes in globals.css, which can carry a breakpoint.
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.65" }],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
