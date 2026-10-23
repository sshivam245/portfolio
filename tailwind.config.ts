import type { Config } from "tailwindcss";

/**
 * A CSS custom property Tailwind can still apply an opacity modifier to.
 *
 * Cast because Tailwind resolves a colour function at build time but types
 * `colors` values as plain strings, so the supported runtime form does not
 * typecheck. The cast is on the published type, not on the behaviour.
 */
const alpha = (name: string) =>
  (({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `var(--${name})`
      : `color-mix(in srgb, var(--${name}) ${Number(opacityValue) * 100}%, transparent)`) as unknown as string;

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
      /*
       * Alpha-aware tokens.
       *
       * These were bare `var(--x)` strings. Tailwind can only apply an
       * opacity modifier to a colour it can decompose, so with no
       * <alpha-value> slot every `/NN` utility built on them was dropped from
       * the compiled CSS *silently* — no error, no warning, just a class that
       * never existed. Four shipped that way:
       *
       *   bg-paper/95      Header      the sticky header had NO background,
       *                                so page content scrolled through the nav
       *   text-ink/[0.09]  Wordmark    rendered at full ink, not 9%
       *   bg-accent/40     Masthead    the four accent hairlines were invisible
       *   bg-paper/90      LogoChip    chips had no backplate
       *
       * color-mix rather than the usual `rgb(var(--x) / <alpha-value>)` channel
       * trick, because that form requires the tokens to be bare channels and
       * globals.css uses `var(--paper)` directly in dozens of places. This way
       * raw CSS keeps working untouched and Tailwind gains the modifier.
       */
      colors: {
        paper: alpha("paper"),
        ink: alpha("ink"),
        "ink-muted": alpha("ink-muted"),
        rule: alpha("rule"),
        accent: alpha("accent"),
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
