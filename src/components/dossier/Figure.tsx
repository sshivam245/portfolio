"use client";

import { useEffect, useRef, useState } from "react";
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
  const imgRef = useRef<HTMLImageElement>(null);

  // A 404 can resolve before hydration, leaving onError unattached — see
  // the same guard in Portrait.tsx.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <figure className="mt-6">
      {failed ? (
        <div
          className="flex min-h-[160px] items-center justify-center border border-dashed p-6 text-center"
          style={{ borderColor: "var(--rule)" }}
        >
          <span className="label">
            Figure pending: drop{" "}
            <span className="text-ink">{figure.src}</span> into /public/figures
          </span>
        </div>
      ) : (
        /*
         * Deliberately NOT loading="lazy". With no intrinsic dimensions the
         * element is 0px tall until it loads, and the browser's lazy-loader
         * never treats a zero-height box as visible — so the request was never
         * made, the image never appeared, and onError never fired to show the
         * placeholder. There are only a handful of small figures on the page.
         */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={asset(`/figures/${figure.src}`)}
          alt={figure.caption}
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
