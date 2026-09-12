"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import type { Logo } from "@/content/logos";

/**
 * One chip on an orbit ring. Falls back down a chain: inline SVG path →
 * image file → text label. That last step is why the orbit looks finished
 * even with /public/logos completely empty.
 *
 * Marks render in brand colour. The supplied files (Clay's 3D arch, Nuvia's
 * gradient) can't be flattened to a single colour without destroying them,
 * so the inline marks match those rather than fighting them.
 */
export default function LogoChip({ logo }: { logo: Logo }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A 404 can resolve before hydration, leaving onError unattached.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const showImage = !logo.path && logo.file && !failed;

  return (
    <span
      title={logo.note ? `${logo.label}: ${logo.note}` : logo.label}
      /* Sized from --orbit-chip, which is a fraction of --orbit-size, so the
         chip and the ring radii can never drift apart. */
      className={`orbit-chip flex items-center justify-center rounded-full border transition-colors duration-200 hover:border-accent ${
        logo.tile
          ? "overflow-hidden"
          : "bg-paper/90 backdrop-blur-sm"
      }`}
      style={{ borderColor: "var(--rule)" }}
    >
      {logo.path ? (
        <svg
          viewBox={logo.viewBox ?? "0 0 24 24"}
          fill="currentColor"
          role="img"
          aria-label={logo.label}
          className="orbit-chip-mark"
          style={{ color: logo.color ?? "var(--ink)" }}
        >
          <path d={logo.path} />
        </svg>
      ) : showImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={asset(`/logos/${logo.file}`)}
          alt={logo.label}
          width={112}
          height={112}
          decoding="async"
          onError={() => setFailed(true)}
          className={
            logo.tile
              ? "h-full w-full object-cover"
              : "orbit-chip-mark object-contain"
          }
        />
      ) : (
        <span className="label px-1 text-center leading-tight text-ink">
          {logo.label}
        </span>
      )}
    </span>
  );
}
