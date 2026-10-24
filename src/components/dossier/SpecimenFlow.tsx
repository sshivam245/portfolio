"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

export type SpecimenStep = { title: string; detail: string };

/**
 * The diagram as something you operate, not something you watch.
 *
 * The site's problem was that nothing on it behaved: every element was read
 * or looked at, and a page where nothing responds reads as a document however
 * well it is set. This is the one authored moment, which is also why the
 * section entrances elsewhere stay quiet. Scattered effects on every section
 * and one real mechanic are not the same thing.
 *
 * Pointing at a step lights its node in the diagram and dims the rest;
 * pointing at a node lights its step. Both directions, because a reader who
 * starts at the picture and a reader who starts at the list are both common.
 *
 * It is a control rather than a scroll effect on purpose: DESIGN.md bans
 * scroll-jacking outright, and a sticky section that drives a build from
 * scroll position is that, whatever it is called.
 *
 * The SVG never re-renders. React owns that subtree through
 * dangerouslySetInnerHTML, so a re-render re-applies the markup and wipes
 * every class and attribute written to its children: that is exactly how the
 * diagram draw animation broke the first time. Memoised with a stable prop,
 * it mounts once, and highlighting is done imperatively on the live nodes.
 */
const Canvas = memo(
  function Canvas({
    markup,
    innerRef,
  }: {
    markup: string;
    innerRef: React.RefObject<HTMLDivElement>;
  }) {
    return (
      <div
        ref={innerRef}
        className="diagram specimen"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  },
  () => true,
);

export default function SpecimenFlow({
  markup,
  steps,
}: {
  markup: string;
  steps: SpecimenStep[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  /*
   * Associate each box with its own two labels by position, because the
   * generator emits them as independent siblings rather than groups. Same
   * rule the build script uses: a label belongs to the box it sits inside.
   */
  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;

    const boxes = Array.from(svg.querySelectorAll<SVGRectElement>("rect.box"));
    const texts = Array.from(svg.querySelectorAll<SVGTextElement>("text"));

    boxes.forEach((box, i) => {
      const bx = Number(box.getAttribute("x"));
      const by = Number(box.getAttribute("y"));
      box.setAttribute("data-step", String(i));
      for (const t of texts) {
        const tx = Number(t.getAttribute("x"));
        const ty = Number(t.getAttribute("y"));
        if (Math.abs(tx - bx) < 30 && ty > by && ty - by < 50) {
          t.setAttribute("data-step", String(i));
        }
      }
    });

    // Pointing at the picture is as natural as pointing at the list.
    const enter = (e: Event) => {
      const el = (e.target as Element).closest?.("[data-step]");
      if (el) setActive(Number(el.getAttribute("data-step")));
    };
    svg.addEventListener("mouseover", enter);
    svg.addEventListener("mouseleave", () => setActive(null));
    return () => svg.removeEventListener("mouseover", enter);
  }, []);

  // Imperative, so the SVG subtree is never re-rendered out from under us.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.classList.toggle("has-active", active !== null);
    root.querySelectorAll("[data-step]").forEach((el) => {
      if (Number(el.getAttribute("data-step")) === active)
        el.setAttribute("data-on", "");
      else el.removeAttribute("data-on");
    });
  }, [active]);

  const clear = useCallback(() => setActive(null), []);

  return (
    <div>
      <Canvas markup={markup} innerRef={ref} />

      <ol
        className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4"
        onMouseLeave={clear}
      >
        {steps.map((s, i) => (
          <li key={s.title}>
            {/*
              A real button: this changes what the diagram shows, so it has to
              be reachable and operable by keyboard, not a div that only
              answers a mouse.
            */}
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={clear}
              onClick={() => setActive(active === i ? null : i)}
              aria-pressed={active === i}
              className={`step-btn press w-full text-left ${
                active === i ? "step-on" : ""
              }`}
            >
              <span className="label block">
                <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2">·</span>
                {s.title}
              </span>
              <span className="mt-1 block font-mono text-small text-ink-muted">
                {s.detail}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
