/**
 * Logos orbiting the portrait.
 *
 * Drop SVG or PNG files into /public/logos using the `file` name below and
 * they render. Until a file exists the chip falls back to the label text,
 * which still reads correctly — so this ships now and improves as you add
 * assets. See docs/logos.md.
 *
 * Only include companies you actually worked for and tools you actually
 * used. These are third-party marks shown to state factual history.
 */

export type Logo = {
  /** Shown when no image file is present, and used as the alt text. */
  label: string;
  /** Filename inside /public/logos, e.g. "hubspot.svg". */
  file: string;
  /** Short qualifier shown in the tooltip. */
  note?: string;
};

/** Inner ring — places worked and studied. */
export const orgLogos: Logo[] = [
  { label: "Cloudsheer", file: "cloudsheer.svg", note: "Growth & Strategy, 2025–" },
  { label: "Nuvia AI", file: "nuvia.svg", note: "Founding GTM → Growth Manager" },
  { label: "Comviva", file: "comviva.svg", note: "UX/UI Design intern" },
  { label: "EY", file: "ey.svg", note: "Cyber Security intern" },
  { label: "LBS", file: "lbs.svg", note: "Digital Marketing with AI" },
];

/** Outer ring — the toolset. */
export const toolLogos: Logo[] = [
  { label: "HubSpot", file: "hubspot.svg" },
  { label: "Clay", file: "clay.svg" },
  { label: "Apollo", file: "apollo.svg" },
  { label: "Tableau", file: "tableau.svg" },
  { label: "Power BI", file: "powerbi.svg" },
  { label: "Python", file: "python.svg" },
  { label: "SQL", file: "sql.svg" },
  { label: "Actions", file: "github-actions.svg" },
];
