"use client";

import { useEffect, useRef } from "react";

/**
 * Reveals a figure when it scrolls into view. It does not count.
 *
 * It used to interpolate the digits from zero, and that was a mistake on this
 * site specifically. A screenshot of the masthead caught "3+" where the figure
 * is 100+ and "1%" where it is 25%. Assessment A caught the same thing at
 * 375px, reading "74+" and "18%". PRODUCT.md's fourth principle is that
 * honesty is load-bearing, and the figures are the one place on a portfolio
 * not to spend a flourish: a hiring manager who glances during the sweep, or
 * screenshots it, has been shown a number that is not true.
 *
 * A first attempt only refused to animate values below ten, which fixed "#1"
 * counting from "#0" and left the real problem untouched, because the figures
 * that matter are all comfortably above ten.
 *
 * So the motion stays and the lying stops: the figure rises into place at its
 * true value, and at no instant does it display anything else. The name is
 * kept because three call sites use it and the behaviour, not the import, is
 * what was wrong.
 *
 * There is no armed state and nothing is ever hidden. The reveal animates
 * transform only, so a figure that never animates is simply a figure that did
 * not slide.
 */
export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const show = () => node.classList.add("figure-shown");

    // Unconditional, so nothing can strand a figure invisible: a frozen
    // observer, a background tab, a browser without IntersectionObserver.
    const failsafe = window.setTimeout(show, 2000);

    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      show();
      window.clearTimeout(failsafe);
      return () => window.clearTimeout(failsafe);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        io.disconnect();
        window.clearTimeout(failsafe);
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  // The authored string, always. tabular-nums keeps columns of figures
  // aligned across the ledger.
  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {value}
    </span>
  );
}
