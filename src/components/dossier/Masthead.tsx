import { headlineMetrics } from "@/content/profile";
import HeroWiring from "./HeroWiring";
import Marks from "./Marks";
import CountUp from "@/components/motion/CountUp";

/**
 * Left-aligned, no gradient, no rotating text, no status pill.
 * `.rise` staggers the four blocks in on load — CSS only, no hydration wait.
 */
export default function Masthead() {
  return (
    <section id="top" className="shell pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="rise">
        {/*
          No eyebrow. It read "Marketing Engineer / Growth & GTM / 2 yrs /
          Remote" above the headline, which is the hero-eyebrow pattern
          Impeccable's craft floor bans outright: the heading carries its own
          weight and a label above it only delays the sentence.

          It also opened the page with "2 yrs". For a founding-GTM hire that
          is the single fact most likely to end the scan, and it was sitting
          above everything that argues against it. The same facts are in the
          line under the headline, in prose, after the claim has landed.
        */}
        <h1 className="t-display">
          I build{" "}
          <span className="italic text-accent">acquisition engines</span>, and
          the automation underneath them.
        </h1>

        {/* max-w-[46ch], not max-w-prose: at 68ch the last two words wrapped
            alone and left "role." orphaned on its own line. */}
        <p className="mt-7 max-w-[46ch] text-body text-ink-muted">
          Growth &amp; Strategy at Cloudsheer, first GTM hire at Nuvia AI, and
          two years of building the acquisition machinery rather than
          describing it. Looking for a founding-GTM role, remote.
        </p>

        {/*
          One primary action, one secondary. Both used to be 12px mono labels,
          identical in treatment to the meta line above them, so the page had
          no visually distinct primary action anywhere on it: a surface whose
          success is an interview was asking for one in the same voice it
          used for "2 YRS".
        */}
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href="#work" className="btn label-tap">
            See the work
          </a>
          <a
            href="#contact"
            className="label label-tap press hover:text-accent transition-colors duration-150"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/*
        Evidence, as an aligned table, not as cards.

        Four shared rows via subgrid: hairline, label, metric, note. A label
        that wraps to two lines ("Google + AI Overview") otherwise pushes only
        its own metric down and the numbers stop sitting on one line. Each
        cell spans the parent's rows so every track is as tall as its tallest
        occupant.

        The <dd> is a nested subgrid rather than display:contents, which keeps
        the dt/dd pairing intact for assistive tech while still letting the
        metric and the note line up as separate rows.
      */}
      <HeroWiring />

      <dl className="mt-0 lg:-mt-1 grid grid-cols-2 gap-x-6 lg:grid-cols-4">
        {headlineMetrics.map((m) => (
          <div
            key={m.label}
            className="row-span-3 grid min-w-0 grid-rows-subgrid rule-b pb-5 pt-4 lg:pb-6"
          >
            <dt className="label mb-2">{m.label}</dt>
            <dd className="row-span-2 grid grid-rows-subgrid">
              {/*
                Accent marks the one figure a stranger can check, not all
                four. Painted uniformly, "#1 in Google's AI Overview" sat at
                exactly the weight of a conversion lift PRODUCT.md lists as
                unconfirmed.
              */}
              <span
                className={`t-metric block break-words ${m.verified ? "text-accent" : ""}`}
              >
                <CountUp value={`${m.value}${m.unit}`} />
              </span>
              <span className="mt-1 block text-small text-ink-muted">{m.note}</span>
            </dd>
          </div>
        ))}
      </dl>

      <Marks />
    </section>
  );
}
