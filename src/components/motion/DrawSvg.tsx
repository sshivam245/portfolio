"use client";

import { useEffect, useRef } from "react";

/**
 * Draws an inlined diagram when it scrolls into view: strokes trace
 * themselves in reading order, arrowheads and labels fade in behind them.
 *
 * The point is not decoration. These diagrams are flows, and a flow that
 * assembles itself in the order it runs is easier to read than one that
 * arrives all at once. That is also why the order is document order: the
 * generator emits boxes, then the arrows leaving them, row by row.
 *
 * Strokes are normalised with pathLength="1" so one CSS rule draws a 380px
 * rect perimeter and a 24px connector at the same rate, with no per-element
 * geometry maths.
 */
export default function DrawSvg({
  markup,
  className,
}: {
  markup: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /*
   * No React state in here, deliberately. Arming used to be a useState, and
   * the re-render made React re-apply dangerouslySetInnerHTML, which wiped
   * every class and pathLength the effect had just written to the SVG's
   * children. React owns this subtree's markup; we only ever touch it
   * imperatively, after mount, and never give React a reason to rewrite it.
   */

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const svg = node.querySelector("svg");
    if (!svg) return;

    // Everything animates, or nothing does. Never a half-drawn diagram.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("drawn");
      return;
    }

    const shapes = Array.from(svg.querySelectorAll("rect, path, line, circle"));
    const texts = Array.from(svg.querySelectorAll("text"));
    texts.forEach((t) => t.classList.add("d-text"));

    const stroked: Element[] = [];
    const filled: Element[] = [];
    for (const el of shapes) {
      // Arrowheads are filled triangles with no stroke: they pop rather than draw.
      const s = getComputedStyle(el).stroke;
      if (s && s !== "none") {
        el.setAttribute("pathLength", "1");
        // A class, not an attribute selector: SVG attribute names are
        // case-folded differently once parsed as HTML, so [pathLength]
        // is unreliable as a hook.
        el.classList.add("d-stroke");
        stroked.push(el);
      } else {
        el.classList.add("d-fill");
        filled.push(el);
      }
    }

    /*
     * Delays are spread across a fixed window rather than a fixed step, so a
     * 60-element diagram does not take three times as long as a 20-element
     * one. Labels trail their box by a beat.
     */
    const SPREAD = 1100;
    const n = Math.max(stroked.length, 1);
    stroked.forEach((el, i) =>
      (el as SVGElement).style.setProperty("--d", `${Math.round((i / n) * SPREAD)}`),
    );
    filled.forEach((el, i) =>
      (el as SVGElement).style.setProperty("--d", `${Math.round((i / Math.max(filled.length, 1)) * SPREAD) + 140}`),
    );
    texts.forEach((el, i) =>
      (el as SVGElement).style.setProperty("--d", `${Math.round((i / Math.max(texts.length, 1)) * SPREAD) + 200}`),
    );

    // Added here rather than rendered, so a visitor whose JS never runs sees
    // a complete diagram instead of an invisible one.
    node.classList.add("diagram-armed");

    const draw = () => node.classList.add("drawn");

    /*
     * Arming hides every stroke and label, so anything that stops the reveal
     * from firing leaves a permanently blank diagram. This already happened
     * once with the section reveals, so the rule here is that the timer is
     * unconditional: it is set first, and the observer only makes the draw
     * happen sooner.
     *
     * Nothing depends on requestAnimationFrame. In a backgrounded or
     * non-compositing tab rAF never runs at all, which would strand a
     * diagram that is already on screen — exactly the case that has no
     * scroll event coming to rescue it.
     */
    const failsafe = window.setTimeout(draw, 2500);

    const stop = () => {
      window.clearTimeout(failsafe);
    };

    // Already on screen: there is no scroll coming, so draw now.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      draw();
      stop();
      return stop;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        draw();
        io.disconnect();
        stop();
      },
      { threshold: 0.25 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`diagram ${className ?? ""}`}
      /*
       * First-party markup only: the caller reads it from public/figures in
       * this repo at build time and strips <script> before it gets here. No
       * submitted or fetched content ever reaches this prop.
       */
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
