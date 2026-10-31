"use client";

import { useCallback, useState } from "react";
import { FUNNEL_STAGES } from "@/content/funnel";
import Funnel3D from "./Funnel3D";

const NAMES = FUNNEL_STAGES.map((s) => s.name);

/**
 * The homepage opens by telling the visitor what is happening to them.
 *
 * "You just entered my funnel." The page treats the reader as a lead and
 * walks them down it, one stage per press, each stage carrying one real
 * result. At the bottom they have converted. It is a joke, and it is also
 * the argument: the person reading is being run through an acquisition
 * engine, built by the person they are reading about.
 *
 * Every figure is in the stage card as text, and the four stage buttons let
 * a keyboard or a screen reader jump straight to any of them. The 3D funnel
 * beside it is the show, never the only place the information lives.
 */
export default function FunnelHero() {
  const [stage, setStage] = useState(0);
  const s = FUNNEL_STAGES[stage];
  const last = stage === FUNNEL_STAGES.length - 1;

  const pick = useCallback((i: number) => setStage(i), []);
  const next = () => setStage((i) => (i === FUNNEL_STAGES.length - 1 ? 0 : i + 1));

  return (
    <section id="top" className="tone-blue relative overflow-hidden">
      <div className="hero-grid shell pb-14 pt-10 sm:pb-20 sm:pt-14">
        <div className="hero-intro">
          <p className="kicker">{last ? "Status: converted ✓" : "Hi. Don't panic."}</p>
          <h1 className="t-display mt-6">
            You just entered <span className="text-zap">my funnel.</span>
          </h1>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed sm:mt-6 sm:text-xl">
            I&apos;m Shivam Goel. I build acquisition engines and the automation
            underneath them. This page is one. Let&apos;s see if it converts you.
          </p>
        </div>

        <div className="hero-funnel">
          <Funnel3D stage={stage} names={NAMES} onPick={pick} />
        </div>

        <div className="hero-controls">
          {/* The stage card. aria-live, so pressing the button announces the
              new figure rather than silently changing the screen. */}
          <div className="stage-card" aria-live="polite" key={stage}>
            <p className="stage-tag">
              Stage {stage + 1} · {s.name}
            </p>
            <p className="t-metric mt-4">
              {/* The highlighter marks the figure a stranger can check. */}
              {s.verified ? <span className="hl">{s.value}</span> : s.value}
            </p>
            <p className="mt-3 max-w-[44ch] text-base leading-relaxed sm:text-lg">
              {s.note}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" className="btn" onClick={next}>
              {last ? "Run the funnel again ↺" : "Move me down the funnel ↓"}
            </button>
            <a href="#work" className="btn-ghost">
              Skip to the work
            </a>
          </div>

          {/* Direct access to every stage. Real buttons, so the whole funnel
              is reachable without a mouse or the 3D scene. */}
          <ol className="mt-7 flex flex-wrap gap-2" aria-label="Funnel stages">
            {FUNNEL_STAGES.map((st, i) => (
              <li key={st.name}>
                <button
                  type="button"
                  onClick={() => setStage(i)}
                  aria-pressed={i === stage}
                  className={`stage-pill${i === stage ? " on" : ""}`}
                >
                  <span className="tnum">{i + 1}</span> {st.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
