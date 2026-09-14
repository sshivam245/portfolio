"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a metric up when it first scrolls into view.
 *
 * The value is authored as a display string ("3.2x", "40%", "$1.2M", "18"),
 * so this splits off whatever wraps the number and animates only the number.
 * Anything it cannot parse renders unchanged rather than guessing.
 *
 * The final string is in the DOM from the first paint, which matters twice:
 * a crawler that does not run the observer still reads the real figure, and
 * the box never resizes mid-count.
 */
const PARSE = /^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/;

// Fast out of the gate, long settle. Linear counting reads like a loading bar.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

export default function CountUp({
  value,
  className,
  duration = 1100,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const m = PARSE.exec(value.trim());
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  const target = m ? Number(m[2].replace(/,/g, "")) : NaN;
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const animatable = !!m && Number.isFinite(target);

  useEffect(() => {
    if (!animatable) return;
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let done = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return;
        done = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const n = target * easeOut(t);
          setDisplay(
            n.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }),
          );
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDisplay(null); // hand the authored string back, commas and all
        };
        raf = requestAnimationFrame(tick);
      },
      // Start once it is properly on screen, not as it clips the bottom edge.
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animatable, target, decimals, duration]);

  if (!animatable) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {/* Hidden from the reader so the count is not announced digit by digit;
          the authored string is exposed once, below, instead. */}
      <span aria-hidden>
        {m![1]}
        {/* tabular-nums stops the width jittering as digits change. */}
        <span className="tnum">{display === null ? m![2] : display}</span>
        {m![3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
