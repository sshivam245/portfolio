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
  /** Inline 24x24 SVG path data. */
  path?: string;
  /** Filename inside /public/logos, e.g. "clay.svg". */
  file?: string;
  /** Short qualifier shown on hover. */
  note?: string;
};

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
  { label: "Tableau", file: "tableau.svg", note: "Dashboards" },
];
