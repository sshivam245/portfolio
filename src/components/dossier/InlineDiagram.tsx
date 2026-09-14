import fs from "node:fs";
import path from "node:path";
import DrawSvg from "@/components/motion/DrawSvg";
import Figure from "./Figure";
import type { Figure as FigureData } from "@/content/caseStudies";

/**
 * Inlines a diagram's SVG so its strokes can animate.
 *
 * Served through <img> an SVG is opaque: nothing inside it can be styled or
 * animated, and it cannot inherit the page's theme. Inlined, it draws itself
 * on scroll and picks up currentColor. This reads from disk at build time,
 * which a static export does once and then never again.
 *
 * Anything that is not an SVG on disk falls through to the normal <img>
 * path, so a PNG diagram still renders.
 */
export default function InlineDiagram({ figure }: { figure: FigureData }) {
  if (!figure.src.endsWith(".svg")) return <Figure figure={figure} />;

  const file = path.join(process.cwd(), "public", "figures", figure.src);
  let markup: string;
  try {
    markup = fs.readFileSync(file, "utf8");
  } catch {
    // Same policy as Figure: a missing file renders nothing, not a broken box.
    return null;
  }

  markup = markup
    // Belt and braces. These are our own generated files, but inlined markup
    // should never be able to carry script regardless of where it came from.
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    // The <img> version relied on the file's own prefers-color-scheme block.
    // Inlined, the diagram is inside the page and must follow the page's
    // theme class instead, which the .diagram rules in globals.css handle.
    .replace(/@media \(prefers-color-scheme: dark\)[\s\S]*?\}\s*\}/g, "");

  return (
    <figure className="mt-6">
      {/* Keeps its native width and scrolls, exactly as the <img> did: at
          375px a 648-wide diagram scaled to fit turns 9px labels into 5px. */}
      <div className="overflow-x-auto">
        <DrawSvg markup={markup} />
      </div>
      <figcaption className="label mt-3 flex gap-2">
        <span className="text-accent">DIAGRAM</span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}
