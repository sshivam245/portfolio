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

  /*
   * A missing figure renders nothing at all. It used to render a dashed frame
   * reading "drop <file> into /public/figures", which is an instruction to the
   * developer that three live case studies were showing to visitors. The
   * expected filenames are documented in docs/figures.md instead.
   */
  if (failed) return null;

  return (
    <figure className="mt-6">
      {/* width/height are what make lazy loading safe here. An earlier
         * version dropped loading="lazy" because, with no intrinsic size,
         * the box was 0px tall, never entered the viewport, and so never
         * loaded at all. With the real dimensions declared the browser
         * reserves the space (no layout shift) and lazy works as intended. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={asset(`/figures/${figure.src}`)}
          alt={figure.caption}
          width={figure.w}
          height={figure.h}
          loading={figure.w && figure.h ? "lazy" : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-auto w-full border"
          style={{ borderColor: "var(--rule)" }}
      />
      <figcaption className="label mt-3 flex gap-2">
        {figure.diagram ? <span className="text-accent">DIAGRAM</span> : null}
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}
