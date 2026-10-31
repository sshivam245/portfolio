"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FUNNEL_STAGES } from "@/content/funnel";
import Funnel3D from "./Funnel3D";

const NAMES = FUNNEL_STAGES.map((s) => s.name);
const LAST = FUNNEL_STAGES.length - 1;
/** How long each stage holds, ms. The conversion holds longest. */
const DURATIONS = [4200, 3800, 3800, 5400];

/**
 * The homepage opens by telling the visitor what is happening to them, and
 * then the funnel runs on its own.
 *
 * Each stage holds for a few seconds while its segment of the progress bar
 * fills, then YOU sinks to the next band; at the bottom it converts, holds,
 * and the loop starts again. Nobody has to find a button for the idea to
 * land.
 *
 * Moving content that starts by itself needs a way to stop it (WCAG 2.2.2),
 * so there is a pause control, and the run also holds while it is off
 * screen, while the tab is hidden, while the pointer rests on the stage
 * card, and while keyboard focus is in the controls. With reduced motion it
 * never starts: the stages are buttons, and the reader steps through them.
 *
 * The progress is written straight to the DOM from a rAF loop rather than
 * through state, so a running funnel re-renders React four times a cycle,
 * not sixty times a second.
 */
export default function FunnelHero() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);

  const stageRef = useRef(0);
  const playingRef = useRef(true);
  const holdRef = useRef(false); // pointer on the card, or focus in controls
  const visibleRef = useRef(true);
  const elapsed = useRef(0);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const section = useRef<HTMLElement>(null);

  const s = FUNNEL_STAGES[stage];

  const paintFills = useCallback((current: number, p: number) => {
    fills.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `scaleX(${i < current ? 1 : i === current ? p : 0})`;
    });
  }, []);

  const goTo = useCallback(
    (i: number) => {
      stageRef.current = i;
      elapsed.current = 0;
      setStage(i);
      paintFills(i, playingRef.current ? 0 : 1);
    },
    [paintFills],
  );

  // Reduced motion: never autoplay.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      playingRef.current = false;
      setPlaying(false);
      paintFills(0, 1);
    }
  }, [paintFills]);

  // Off screen, nothing advances.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The clock. rAF also stops on its own while the tab is hidden.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Real elapsed time, capped at a second. A throttled tab (low-power
      // mode, an unfocused embed) can deliver one frame a second, and a
      // tight per-frame cap made the funnel run ten times slow there. The
      // cap only exists so a tab returning from the background does not
      // skip a stage in one jump.
      const dt = Math.min(now - last, 1000);
      last = now;
      if (playingRef.current && !holdRef.current && visibleRef.current) {
        elapsed.current += dt;
        const cur = stageRef.current;
        const p = Math.min(elapsed.current / DURATIONS[cur], 1);
        const el = fills.current[cur];
        if (el) el.style.transform = `scaleX(${p})`;
        if (p >= 1) goTo(cur === LAST ? 0 : cur + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [goTo]);

  const toggle = () => {
    const next = !playingRef.current;
    playingRef.current = next;
    setPlaying(next);
    if (!next) paintFills(stageRef.current, 1);
    else {
      elapsed.current = 0;
      paintFills(stageRef.current, 0);
    }
  };

  const hold = (on: boolean) => () => {
    holdRef.current = on;
  };

  return (
    <section ref={section} id="top" className="tone-blue relative overflow-hidden">
      <div className="hero-grid shell pb-14 pt-12 sm:pb-20 sm:pt-16">
        <div className="hero-intro">
          <h1 className="t-display">
            You just entered <span className="text-zap">my funnel.</span>
          </h1>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-ink-muted sm:text-xl">
            I&apos;m Shivam Goel, a marketing engineer. I build acquisition engines
            and the automation underneath them. This page is one of them.
          </p>
        </div>

        <div className="hero-funnel">
          <Funnel3D stage={stage} names={NAMES} onPick={goTo} />
        </div>

        <div className="hero-controls">
          {/* Announced only when the reader is driving. While it runs on its
              own, a live region would read a new figure every four seconds. */}
          <div
            className="stage-card"
            aria-live={playing ? "off" : "polite"}
            key={stage}
            onMouseEnter={hold(true)}
            onMouseLeave={hold(false)}
          >
            <p className="stage-tag">
              Stage {stage + 1} of {FUNNEL_STAGES.length} · {s.name}
            </p>
            <p className="t-metric mt-4">
              {/* The highlighter marks the figure a stranger can check. */}
              {s.verified ? <span className="hl">{s.value}</span> : s.value}
            </p>
            <p className="mt-3 max-w-[44ch] text-base leading-relaxed sm:text-lg">
              {s.note}
            </p>
          </div>

          <div
            className="fp mt-6"
            onFocus={hold(true)}
            onBlur={hold(false)}
          >
            <div className="fp-segs" role="group" aria-label="Funnel stages">
              {FUNNEL_STAGES.map((st, i) => (
                <button
                  key={st.name}
                  type="button"
                  className="fp-seg"
                  aria-pressed={i === stage}
                  aria-label={`Stage ${i + 1}: ${st.name}`}
                  onClick={() => goTo(i)}
                >
                  <span className="fp-bar">
                    <span
                      className="fp-fill"
                      ref={(el) => {
                        fills.current[i] = el;
                      }}
                    />
                  </span>
                  <span aria-hidden>
                    <span className="tnum">{i + 1}</span>
                    <span className="fp-name"> {st.name}</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="fp-toggle"
              onClick={toggle}
              aria-label={playing ? "Pause the funnel" : "Play the funnel"}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <rect x="2" y="1.5" width="3.5" height="11" rx="1" fill="currentColor" />
                  <rect x="8.5" y="1.5" width="3.5" height="11" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path d="M3 1.8v10.4a.8.8 0 0 0 1.2.7l8.6-5.2a.8.8 0 0 0 0-1.4L4.2 1.1A.8.8 0 0 0 3 1.8Z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn">
              See the work
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
