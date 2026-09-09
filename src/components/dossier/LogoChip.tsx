"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import type { Logo } from "@/content/logos";

/**
 * One chip on an orbit ring. Falls back down a chain: inline SVG path →
 * image file → text label. That last step is why the orbit looks finished
 * even with /public/logos completely empty.
 *
 * Inline marks are drawn in currentColor rather than brand colours, so a
 * chip containing a logo and a chip containing text read as the same object.
 * Brand colours at 32px against a near-black ground would just be noise.
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
      title={logo.note ? `${logo.label} — ${logo.note}` : logo.label}
      className="flex h-14 w-14 items-center justify-center rounded-full border bg-paper/90 backdrop-blur-sm transition-colors duration-200 hover:border-accent sm:h-16 sm:w-16"
      style={{ borderColor: "var(--rule)" }}
    >
      {logo.path ? (
        <svg
          viewBox={logo.viewBox ?? "0 0 24 24"}
          fill="currentColor"
          role="img"
          aria-label={logo.label}
          className="h-6 w-6 text-ink sm:h-7 sm:w-7"
        >
          <path d={logo.path} />
        </svg>
      ) : showImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={asset(`/logos/${logo.file}`)}
          alt={logo.label}
          onError={() => setFailed(true)}
          className="h-6 w-6 object-contain sm:h-7 sm:w-7"
        />
      ) : (
        <span className="label px-1 text-center leading-tight text-ink">
          {logo.label}
        </span>
      )}
    </span>
  );
}
