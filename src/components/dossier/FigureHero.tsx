"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import type { Figure as FigureData } from "@/content/caseStudies";

/**
 * The one artefact that is the proof, shown at the size that makes it one.
 *
 * The AI Overview screenshot is the only outcome on this site a stranger can
 * verify without taking its word for anything, and it was rendering at 452px
 * in a sidebar next to the stack list. The page claimed the strongest thing
 * it had in a thumbnail.
 *
 * Bounded by viewport height rather than run full-bleed. The file is
 * 1400x1340, so at the shell's full width it would stand 1103px tall and the
 * reader would meet a screenshot filling more than their whole screen with no
 * idea what it was. 76vh is large enough to read the citation in it and small
 * enough that the caption is visible underneath at the same time, which is
 * what makes it evidence rather than decoration.
 */
export default function FigureHero({ figure }: { figure: FigureData }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A 404 can resolve before hydration, leaving onError unattached.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  // Same policy as every other figure: a missing file renders nothing rather
  // than a broken frame, and never developer copy aimed at the wrong reader.
  if (failed) return null;

  return (
    <figure className="flex flex-col items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={asset(`/figures/${figure.src}`)}
        alt={figure.caption}
        width={figure.w}
        height={figure.h}
        decoding="async"
        onError={() => setFailed(true)}
        /* No lazy loading: this sits high on the page and is the thing the
           reader came to see. */
        className="h-auto w-auto max-h-[76vh] max-w-full border"
        style={{ borderColor: "var(--rule)" }}
      />
      <figcaption className="label mt-5 flex max-w-prose gap-2 text-center">
        <span className="text-ink-a">Evidence</span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}
