import {
  siClaude,
  siN8n,
  siHubspot,
  siPython,
  siPostgresql,
  siGithubactions,
} from "simple-icons";

/**
 * Logos orbiting the portrait.
 *
 * Three ways a chip can render, in order of preference:
 *   1. `path`  — an inline SVG path (from simple-icons). Inherits
 *                currentColor, so it matches the text chips exactly.
 *   2. `file`  — an image dropped into /public/logos. Use for brands
 *                simple-icons doesn't carry; see docs/logos.md.
 *   3. `label` — plain text. Always works, always legible.
 *
 * Only list companies actually worked for and tools actually used.
 */

export type Logo = {
  /** Fallback text, and the alt text for image/inline marks. */
  label: string;
  /** Inline SVG path data. */
  path?: string;
  /** Defaults to simple-icons' 24x24 grid. */
  viewBox?: string;
  /** Filename inside /public/logos, e.g. "clay.svg". */
  file?: string;
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

/** Inner ring — places worked and studied. simple-icons carries none of
 *  these, so they render as text until logo files are supplied. */
export const orgLogos: Logo[] = [
  { label: "Cloudsheer", file: "cloudsheer.svg", note: "Growth & Strategy, 2025–" },
  { label: "Nuvia AI", file: "nuvia.svg", note: "Founding GTM → Growth Manager" },
  { label: "Comviva", file: "comviva.svg", note: "UX/UI Design intern" },
  { label: "EY", file: "ey.svg", note: "Cyber Security intern" },
  { label: "LBS", file: "lbs.svg", note: "Digital Marketing with AI" },
];

/** Outer ring — the toolset. */
export const toolLogos: Logo[] = [
  { label: "Claude", path: siClaude.path, note: "LLM scoring and drafting" },
  { label: "n8n", path: siN8n.path, note: "Workflow automation" },
  { label: "Clay", file: "clay.svg", note: "Enrichment and list building" },
  // NOTE: deliberately not simple-icons' `siApollographql` — that is Apollo
  // GraphQL, an unrelated company. This is Apollo.io, the sales platform.
  { label: "Apollo", file: "apollo.svg", note: "Prospecting — apollo.io" },
  { label: "HubSpot", path: siHubspot.path, note: "CRM and lifecycle" },
  { label: "Python", path: siPython.path, note: "Pipelines and analysis" },
  { label: "SQL", path: siPostgresql.path, note: "Reporting and analysis" },
  { label: "Actions", path: siGithubactions.path, note: "Scheduled runs" },
  { label: "Tableau", path: TABLEAU_PATH, viewBox: "0 0 512 512", note: "Dashboards" },
];
