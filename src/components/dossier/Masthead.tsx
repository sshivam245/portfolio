"use client";

import { useState } from "react";
import { headlineMetrics } from "@/content/profile";
import Marks from "./Marks";

/**
 * The hero is an answer, and the figures are its sources.
 *
 * What was here before was the arrangement every portfolio uses: headline,
 * standfirst, button, a row of figures, a row of logos. Correct, aligned,
 * and silent about what this person does. The claim sat at the top and the
 * evidence sat underneath it, related only by proximity.
 *
 * The strongest thing on this site is that a page built here became the
 * answer Google's AI Overview gives, with a citation pointing back. So the
 * hero is built out of that: the headline carries superscript citations, and
 * each one is a real link into the source it refers to. Pointing at a
 * citation lights its source. The page argues the way a cited answer argues
 * — here is the claim, here is what backs it, here is which part of it you
 * can check without taking my word for anything.
 *
 * It is also the demonstration. Generative-search optimisation is the
 * service being sold two sections further down; the first screen performs it
 * rather than describing it.
 *
 * Client component for one reason: the citation/source highlight. Everything
 * it renders is in the markup on first paint, so with JS off the citations
 * are still anchors and :target still lights the source they land on.
 */
export default function Masthead() {
  const [lit, setLit] = useState<number | null>(null);

  /*
   * The headline is the one in PRODUCT.md, unchanged, with two citations set
   * into it. [1] lands on the AI Overview citation because that is what backs
   * "acquisition engines"; [2] lands on the brand launch because that is the
   * automation built from nothing. The other two figures are sources without
   * being cited inline — a real answer does not cite every source in its
   * first sentence.
   */
  /*
   * Both plates render from this one function, which is not a tidiness
   * choice: the ghost has to break lines in exactly the same places as the
   * real headline or the offset stops being a misregistration and becomes
   * two different sentences lying on top of each other.
   *
   * The first version gave the ghost the bare sentence and the live plate
   * the sentence plus two citation brackets. Those are different strings, so
   * they wrapped differently, and the result was a pink comma and a pink
   * full stop floating in the middle of the headline. Same characters, same
   * metrics, or the effect does not work.
   *
   * On the ghost the citations are inert spans: an aria-hidden duplicate
   * must not put a second copy of every link into the tab order.
   */
  const headline = (ghost: boolean) => {
    const Cite = ({ n }: { n: number }) =>
      ghost ? (
        <span className="cite">[{n}]</span>
      ) : (
        <a
          href={`#source-${n}`}
          className="cite label-tap press"
          onMouseEnter={() => setLit(n)}
          onMouseLeave={() => setLit(null)}
          onFocus={() => setLit(n)}
          onBlur={() => setLit(null)}
          aria-label={`Source ${n}: ${headlineMetrics[n - 1].label}`}
        >
          [{n}]
        </a>
      );
    return (
      <>
        I build acquisition engines
        <Cite n={2} />, and the automation underneath them
        <Cite n={1} />.
      </>
    );
  };

  return (
    <section id="top" className="shell pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="rise">
        {/* The question the page answers, in the grammar of a prompt. Set in
            mono against the display plate so it reads as a typographic
            device and never as a screenshot of somebody's search box. */}
        <p className="font-mono text-small text-ink-muted">
          <span className="text-ink-a" aria-hidden>
            &gt;{" "}
          </span>
          who builds the acquisition engine, and the automation under it
        </p>

        <p className="label mt-5 text-ink-a">
          Answer &middot; {headlineMetrics.length} sources
        </p>

        {/*
          Two plates. The ghost repeats the headline and is hidden from
          assistive tech, so the sentence is announced once.
        */}
        <h1 className="t-display plate mt-3">
          <span aria-hidden className="plate-ghost">
            {headline(true)}
          </span>
          {headline(false)}
        </h1>

        {/* max-w-[46ch], not max-w-prose: at 68ch the last two words wrapped
            alone and left "role." orphaned on its own line. */}
        <p className="mt-7 max-w-[46ch] text-body text-ink-muted">
          Growth &amp; Strategy at Cloudsheer, first GTM hire at Nuvia AI, and
          two years of building the acquisition machinery rather than
          describing it. Looking for a founding-GTM role, remote.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href="#work" className="btn label-tap">
            See the work
          </a>
          <a
            href="#contact"
            className="label label-tap press transition-colors duration-150 hover:text-ink-a"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/*
        The sources.

        An <ol>, not the <dl> this used to be. A numbered list is what these
        are now: the citations above point into it, and the list supplies the
        numbering that the ordering depends on. Each item reads as one
        sentence to a screen reader — "100+, qualified leads, in 6 months,
        Nuvia AI" — which is how the figure is meant to be read.
      */}
      <div className="mt-14 border-t-[3px] border-ink-b pt-5">
        <p className="label">Sources</p>
        <ol className="mt-3">
          {headlineMetrics.map((m, i) => (
            <li
              key={m.label}
              id={`source-${i + 1}`}
              /*
               * min-w-0 on the content columns, and auto rather than a fixed
               * 2.25rem for the bracket.
               *
               * At 375px with text zoomed to 200% the fixed column became
               * 72px and the gap 32px, and the row overflowed the page by
               * 10px — WCAG 1.4.10 reflow, failed. A grid track defaults to
               * min-content, so a long note with nowhere to break pushes the
               * track wider than its share however small 1fr claims to be.
               */
              className={`source rule-b grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-4 lg:grid-cols-[auto_7rem_minmax(0,1fr)_auto] ${
                lit === i + 1 ? "source-on" : ""
              }`}
            >
              <span className="font-mono text-small text-ink-a" aria-hidden>
                [{i + 1}]
              </span>

              {/*
                Accent is the overlap colour and it means one thing: an
                outside system can confirm this. Painted on all four
                figures it said nothing, and it put "#1 in Google's AI
                Overview" at exactly the weight of a conversion lift
                PRODUCT.md records as unconfirmed.
              */}
              <span
                className={`t-metric-sm col-start-2 min-w-0 break-words ${m.verified ? "text-accent" : ""}`}
              >
                {m.value}
                {m.unit}
              </span>

              <span className="label col-start-2 min-w-0 break-words lg:col-start-3 lg:pt-1.5">
                {m.label}
              </span>

              <span className="col-start-2 min-w-0 break-words text-small text-ink-muted lg:col-start-4 lg:pt-1 lg:text-right">
                {m.note}
                {m.verified ? (
                  <span className="ms-3 whitespace-nowrap text-accent">
                    <span className="reg" aria-hidden /> verifiable
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <Marks />
    </section>
  );
}
