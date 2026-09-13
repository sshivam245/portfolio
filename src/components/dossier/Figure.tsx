"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import type { Figure as FigureData } from "@/content/caseStudies";

/**
 * Renders an artifact from /public/figures.
 *
 * A missing file renders nothing rather than a broken image. A `diagram`
 * figure is labelled as drawn and never passed off as a screenshot: it is
 * evidence of how something works, not that it worked.
 */
export default function Figure({ figure }: { figure: FigureData }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /*
   * A tall figure gets a narrower column. At the full 1152px the AI Overview
   * screenshot rendered 1103px tall — one image filling an entire viewport,
   * which reads as a mistake rather than emphasis. Wide figures (diagrams,
   * charts) keep the full width, where the extra pixels buy legibility.
   */
  const aspect = figure.w && figure.h ? figure.w / figure.h : 2;
  // Only bites for a tall figure rendered full-bleed; inside the aside the
  // column is already narrower than this.
  const tall = aspect < 1.6;

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
      {/*
        Two sizing rules, both learned the hard way:
        - A diagram keeps its native width and scrolls, because at 375px a
          648-wide diagram renders at 0.53x and its 9px labels become 5px.
        - A tall figure is capped, because at full width the AI Overview
          screenshot was 1103px tall and filled the viewport on its own.
        width/height are declared so the browser reserves space (no layout
        shift) and loading="lazy" actually fires — without them the box is
        0px tall, never enters the viewport, and never loads.
      */}
      <div
        className={[
          figure.diagram ? "overflow-x-auto" : "",
          tall ? "mx-auto max-w-[760px]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
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
          style={{
            borderColor: "var(--rule)",
            minWidth: figure.diagram ? `${figure.w ?? 640}px` : undefined,
          }}
        />
      </div>
      <figcaption className="label mt-3 flex gap-2">
        {figure.diagram ? (
          <span className="text-accent">DIAGRAM</span>
        ) : null}
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}
