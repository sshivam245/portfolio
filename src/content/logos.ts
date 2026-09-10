import {
  siClaude,
  siN8n,
  siHubspot,
  siPython,
  siPostgresql,
  siGithubactions,
} from "simple-icons";

/**
 * Logos orbiting the monogram.
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
 * Tableau's mark, from the Ionicons set on Wikimedia Commons (MIT). It is
 * the real logo, square and single-colour, so it inlines cleanly like the
 * simple-icons marks. Its native viewBox is 512, not 24.
 */
const TABLEAU_PATH =
  "M242.69,340.3h26.62V267.7h67V241.88h-67v-72.6H242.69v72.6H176.54V267.7h66.15Z M119.26,445.18h22.59V380.64h59.7V360.47h-59.7V295.13H119.26v65.34H59.56v20.17h59.7Z M370.15,212h22.59V147.5h60.5V128.13h-60.5V62.79H370.15v65.34h-59.7V147.5h59.7Z M246.72,496h19.36V450h41.15V433.08H266.08v-46H246.72v46H206.39V450h40.33Z M120.07,212h21V146.69h60.51V128.13H141V62.79h-21v65.34H59.56v18.56h60.51Z M435.72,308.84h19.36V263.66H496V245.92H455.08V200.74H435.72v45.18H395.39v17.74h40.33Z M370.15,445.18h22.59V380.64h60.5V360.47h-60.5V295.13H370.15v65.34h-59.7v20.17h59.7Z M307,74.08V60.37H266.66V16H252.14V60.37H211.81V74.08h40.33v44.37h14.52V74.08ZM56.11,305.61H70.63V261.24H111V247.53H70.63V204H56.11v43.56H16v14.52L56.11,262Z";

/**
 * Inner ring — places worked and studied.
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
export const toolLogos: Logo[] = [
  { label: "Claude", path: siClaude.path, color: `#${siClaude.hex}`, note: "LLM scoring and drafting" },
  { label: "n8n", path: siN8n.path, color: `#${siN8n.hex}`, note: "Workflow automation" },
  { label: "Clay", file: "clay.png", note: "Enrichment and list building" },
  // NOTE: deliberately not simple-icons' `siApollographql` — that is Apollo
  // GraphQL, an unrelated company. This is Apollo.io, the sales platform.
  { label: "Apollo", file: "apollo.png", note: "Prospecting — apollo.io" },
  { label: "HubSpot", path: siHubspot.path, color: `#${siHubspot.hex}`, note: "CRM and lifecycle" },
  // Python's own #3776AB is very dark on a near-black ground; this is the
  // lighter blue from its two-tone mark, so it stays visible.
  { label: "Python", path: siPython.path, color: "#4B8BBE", note: "Pipelines and analysis" },
  { label: "SQL", path: siPostgresql.path, color: "#6A93E8", note: "Reporting and analysis" },
  { label: "Actions", path: siGithubactions.path, color: `#${siGithubactions.hex}`, note: "Scheduled runs" },
  // Ionicons' Tableau glyph is single-colour, so it takes Tableau's brand orange.
  { label: "Tableau", path: TABLEAU_PATH, viewBox: "0 0 512 512", color: "#E97627", note: "Dashboards" },
];
