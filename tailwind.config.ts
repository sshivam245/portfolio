import type { Config } from "tailwindcss";

/**
 * A CSS custom property Tailwind can still apply an opacity modifier to.
 *
 * Cast because Tailwind resolves a colour function at build time but types
 * `colors` values as plain strings, so the supported runtime form does not
 * typecheck. The cast is on the published type, not on the behaviour.
 */
const alpha = (name: string) =>
  (({ opacityValue }: { opacityValue?: string }) => {
    /*
     * opacityValue is NOT just a number or undefined. For an unmodified
     * utility like `text-accent`, Tailwind passes the string
     * "var(--tw-text-opacity)" so the colour can take part in its opacity
     * variable system. An earlier version of this only checked for
     * `undefined`, so that string went through `Number()`, became NaN, and
     * emitted `color-mix(in srgb, var(--accent) NaN%, transparent)` — an
     * invalid declaration Tailwind drops. The result was every plain
     * `.text-accent`, `.text-ink` and `.bg-accent` compiling to nothing:
     * the same silent-failure class this helper was written to fix.
     *
     * So: a real number means a modifier was used; anything else means hand
     * back the bare custom property.
     */
    const ratio = Number(opacityValue);
    return opacityValue !== undefined && opacityValue !== "" && Number.isFinite(ratio)
      ? `color-mix(in srgb, var(--${name}) ${ratio * 100}%, transparent)`
      : `var(--${name})`;
  }) as unknown as string;

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
        /*
         * The two plates, and what they make where they overlap.
         *
         * `accent` is the overlap. It is not a free accent colour: it means
         * "an outside system can confirm this" and is spent on nothing else.
         *
         * `ink-b` is 2.8:1 on light stock — a real fluorescent ink, as
         * unreadable on cream here as it would be on press. Plates, fills
         * and rules only; never small text in light mode. sync-tokens.mjs
         * greps for `text-ink-b` outside a dark: prefix and fails the build.
         */
        block: alpha("block"),
        "on-block": alpha("on-block"),
        zap: alpha("zap"),
        "on-zap": alpha("on-zap"),
        "ink-a": alpha("ink-a"),
        "ink-b": alpha("ink-b"),
        accent: alpha("accent"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        /* Display is the same family at a heavier weight and a larger optical
           size, so it is an alias rather than a second face. `mono` points at
           it too: nothing on this site is set in a monospace any more. */
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
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
