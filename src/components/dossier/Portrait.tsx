"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";

/**
 * Portrait slot. Drop a photo at /public/portrait.jpg and it appears.
 * Until then this renders a labelled frame rather than a broken image —
 * same contract as <Figure>.
 *
 * 4:5 crop, hard corners, no rounded avatar. Full colour — a desaturated
 * headshot was one restraint too many on an already-quiet page.
 */
export default function Portrait() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /*
   * The image is in the server-rendered HTML, so a 404 can resolve BEFORE
   * React hydrates — in which case the onError handler is attached too late
   * and never fires. Re-check the real load state on mount.
   */
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className="flex aspect-[4/5] w-full max-w-[280px] items-center justify-center border border-dashed p-6 text-center"
        style={{ borderColor: "var(--rule)" }}
      >
        <span className="label">
          Portrait pending — add{" "}
          <span className="text-ink">public/portrait.jpg</span>
        </span>
      </div>
    );
  }

  return (
    <div className="group relative w-full max-w-[280px] overflow-hidden border" style={{ borderColor: "var(--rule)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={asset("/portrait.jpg")}
        alt="Shivam Goel"
        onError={() => setFailed(true)}
        className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
