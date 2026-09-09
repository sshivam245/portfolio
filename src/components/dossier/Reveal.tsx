"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll reveal that cannot blank the page.
 *
 * The first version hid every section with `opacity: 0` in CSS and waited for
 * an IntersectionObserver — which meant the whole page was blank for ~3s while
 * React hydrated, and forever if JS failed. The second version was CSS-only
 * (`animation-timeline`) and therefore invisible outside Chromium.
 *
 * This one: content renders visible. After mount we arm ONLY the sections that
 * are already below the fold — hiding something the user cannot see causes no
 * flash — then fade them in as they scroll up. Above-the-fold content is never
 * touched, and with no JS everything simply stays visible.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let io: IntersectionObserver | undefined;
    let failsafe: number | undefined;
    let settle: number | undefined;
    let cancelled = false;

    /*
     * Measure only once layout has settled. Measuring straight away is wrong:
     * before the webfonts and the figure placeholders have sized, every
     * section still sits near the top of the document and reads as
     * above-the-fold, so nothing ever arms and the reveal silently does
     * nothing.
     */
    const arm = () => {
      if (cancelled || !ref.current) return;

      // Only arm what's off-screen. Anything visible now stays visible.
      if (ref.current.getBoundingClientRect().top < window.innerHeight) return;
      setState("armed");
      observe();
    };

    const observe = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState("shown");
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      observer.observe(el);
      io = observer;

      // Failsafe: if the observer never fires for any reason, reveal anyway.
      failsafe = window.setTimeout(() => setState("shown"), 4000);
    };

    /*
     * Race a frame against a short timer. requestAnimationFrame alone is not
     * enough — browsers suspend it in background tabs, so a page opened in a
     * background tab would never arm. Whichever fires first wins; `armed`
     * guards against running twice.
     */
    let didArm = false;
    const armOnce = () => {
      if (didArm) return;
      didArm = true;
      arm();
    };

    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      requestAnimationFrame(armOnce);
      settle = window.setTimeout(armOnce, 120);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      if (failsafe) window.clearTimeout(failsafe);
      if (settle) window.clearTimeout(settle);
    };
  }, []);

  const stateClass =
    state === "armed" ? "reveal-armed" : state === "shown" ? "reveal-shown" : "";

  return (
    <div ref={ref} className={`reveal ${stateClass} ${className}`}>
      {children}
    </div>
  );
}
