"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";
import type { Logo } from "@/content/logos";

/**
 * One chip on an orbit ring. Renders the logo image when the file exists,
 * otherwise the label text — which is why the orbit looks finished before a
 * single logo asset has been collected.
 */
export default function LogoChip({ logo }: { logo: Logo }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A 404 can resolve before hydration, leaving onError unattached.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span
      title={logo.note ? `${logo.label} — ${logo.note}` : logo.label}
      className="flex h-14 w-14 items-center justify-center rounded-full border bg-paper/90 backdrop-blur-sm transition-colors duration-200 hover:border-accent sm:h-16 sm:w-16"
      style={{ borderColor: "var(--rule)" }}
    >
      {failed ? (
        <span className="label px-1 text-center leading-tight text-ink">
          {logo.label}
        </span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={asset(`/logos/${logo.file}`)}
          alt={logo.label}
          onError={() => setFailed(true)}
          className="h-7 w-7 object-contain sm:h-8 sm:w-8"
        />
      )}
    </span>
  );
}
