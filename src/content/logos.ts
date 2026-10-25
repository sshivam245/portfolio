/**
 * Employer marks. The orbit that carried these is gone; Marks.tsx
 * renders them as a static row.
 *
 * Three ways a chip can render, in order of preference:
 *   1. `path`  — an inline SVG path (from simple-icons), drawn in `color`.
 *   2. `file`  — an image in /public/logos. Used for brands simple-icons
 *                doesn't carry; see docs/logos.md.
 *   3. `label` — plain text. Always works, always legible.
 *
 * Everything renders in brand colour. The supplied marks (Clay's 3D arch,
 * Nuvia's gradient, Cloudsheer's blue-and-orange) are inherently colourful
 * and can't be flattened to white without destroying them, so the inline
 * marks match them rather than the other way round.
 *
 * Only list companies actually worked for and tools actually used.
 */

export type Logo = {
  /** Fallback text, and the alt text for image/inline marks. */
  label: string;
  /** Inline SVG path data. */
  path?: string;
  /** Brand hex for an inline mark. Defaults to currentColor. */
  color?: string;
  /** Defaults to simple-icons' 24x24 grid. */
  viewBox?: string;
  /** Filename inside /public/logos, e.g. "clay.png". */
  file?: string;
  /**
   * The file is a square app-icon/avatar tile with its own background
   * (Nuvia's gradient, LBS's navy block) rather than a transparent glyph.
   * Tiles fill the whole chip instead of sitting at 28px inside it — which
   * is the only size at which LBS's three lines of type are legible.
   */
  tile?: boolean;
  /** Short qualifier shown on hover. */
  note?: string;
};

/**
 * Places worked and studied.
 *
 * Cloudsheer, Nuvia and Apollo were cropped from supplied lockups down to
 * their icon; the wordmarks were discarded because they're unreadable at
 * 28px. `ey.svg` is EY's reversed lockup — white wordmark, yellow beam —
 * recoloured from the supplied navy version for the dark ground. Shapes
 * are unmodified in every case.
 *
 * Nuvia, LBS and Comviva are square avatars with their own backgrounds, so
 * they use `tile` and fill the chip rather than shrinking to a 28px glyph.
 *
 * Every mark on this ring is now a real logo.
 */
export const orgLogos: Logo[] = [
  { label: "Cloudsheer", file: "cloudsheer.png", note: "Growth & Strategy, 2025–" },
  { label: "Nuvia AI", file: "nuvia.png", tile: true, note: "Founding GTM → Growth Manager" },
  // NOTE: this avatar is the red-parallelogram-on-maroon Tech Mahindra mark
  // (Comviva is a Tech Mahindra company) rather than Comviva's own red
  // "comviva" wordmark. Supplied deliberately; worth a second look if you
  // want Comviva's own branding here.
  { label: "Comviva", file: "comviva.png", tile: true, note: "UX/UI Design intern" },
  { label: "EY", file: "ey.svg", note: "Cyber Security intern" },
  { label: "LBS", file: "lbs.png", tile: true, note: "Digital Marketing with AI" },
];

/** Outer ring — the toolset. Colours are each brand's own hex. */
