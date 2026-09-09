"use client";

import { useState } from "react";
import { asset } from "@/lib/basePath";
import type { Figure as FigureData } from "@/content/caseStudies";

/**
 * Renders a real artifact from /public/figures. If the file isn't there yet,
 * it falls back to a labelled placeholder frame rather than a broken image —
 * so the site ships before every screenshot has been collected.
 *
 * A `diagram` figure is labelled as drawn, never presented as a screenshot.
 */
export default function Figure({ figure }: { figure: FigureData }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="mt-6">
      {failed ? (
        <div
          className="flex min-h-[160px] items-center justify-center border border-dashed p-6 text-center"
          style={{ borderColor: "var(--rule)" }}
        >
          <span className="label">
            Figure pending — drop{" "}
            <span className="text-ink">{figure.src}</span> into /public/figures
          </span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={asset(`/figures/${figure.src}`)}
          alt={figure.caption}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full border"
          style={{ borderColor: "var(--rule)" }}
        />
      )}
      <figcaption className="label mt-3 flex gap-2">
        {figure.diagram ? <span className="text-accent">DIAGRAM</span> : null}
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}
