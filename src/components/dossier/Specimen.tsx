import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Section from "./Section";
import DrawSvg from "@/components/motion/DrawSvg";

/**
 * One real system, drawn at full width, as the homepage's main visual.
 *
 * It replaces a rotating ring of other companies' logos, which was the
 * largest element on the first screen and the single most common decorative
 * device in developer portfolios. The diagrams were already the most
 * distinctive thing on this site and they were all buried inside case
 * studies; the work index borrows their visual grammar while nothing on the
 * homepage ever showed one.
 *
 * Full width is not a stretch here, it is a promotion. The file is 648px
 * wide with 9px labels, so at the shell's 1152px every label lands near 16px:
 * the specimen is more legible than the same drawing inside its case study,
 * not less. Vector, so there is nothing to lose by scaling it.
 */
const SPECIMEN = {
  file: "aeo-mechanism.svg",
  caption:
    "How a page becomes the answer: entity layer, question-shaped headings, a liftable answer per section.",
  from: { slug: "aeo-geo", title: "Cited by Google's AI Overview" },
};

export default function Specimen({ index = "01" }: { index?: string }) {
  const file = path.join(process.cwd(), "public", "figures", SPECIMEN.file);
  let markup: string;
  try {
    markup = fs.readFileSync(file, "utf8");
  } catch {
    // Same policy as every other figure: a missing file renders nothing
    // rather than a broken frame.
    return null;
  }

  markup = markup
    // Our own generated file, but inlined markup should never be able to
    // carry script regardless of where it came from.
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    // Inlined, it follows the page's theme class rather than the file's own
    // prefers-color-scheme block, which would ignore the site's toggle.
    .replace(/@media \(prefers-color-scheme: dark\)[\s\S]*?\}\s*\}/g, "")
    // Drop the fixed pixel size so the viewBox can scale to the container.
    // Without this the SVG renders at its native 648px and the whole point
    // of showing it here is lost.
    .replace(/<svg([^>]*?)\swidth="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*?)\sheight="[^"]*"/, "<svg$1");

  return (
    <Section
      id="specimen"
      index={index}
      title="A system, at full size"
      aside="Drawn, not described"
    >
      <figure>
        <DrawSvg markup={markup} className="specimen" />
        <figcaption className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="max-w-prose text-small text-ink-muted">
            {SPECIMEN.caption}
          </span>
          <Link
            href={`/work/${SPECIMEN.from.slug}`}
            className="link label-tap press shrink-0 text-small"
          >
            {SPECIMEN.from.title} ↗
          </Link>
        </figcaption>
      </figure>
    </Section>
  );
}
