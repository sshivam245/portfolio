"use client";

import { useRef, useState } from "react";
import {
  ACVS, BOTTLENECKS, MOTIONS, TEAMS, TOOLS, recommend,
  type Acv, type Answers, type Bottleneck, type Motion, type Result, type Team,
} from "@/lib/agentfit/engine";

/** One chip, radio or checkbox. The input stays real so keyboard and screen
    readers get the semantics; only the box is hidden. */
function Chip({
  label, hint, on, onChange, type, name,
}: {
  label: string; hint?: string; on: boolean; onChange: () => void;
  type: "radio" | "checkbox"; name: string;
}) {
  return (
    <label className={`chip ${on ? "chip-on" : ""} flex-col items-start !py-2`}>
      <input
        type={type} name={name} checked={on} onChange={onChange}
        className="chip-input sr-only"
      />
      <span>{label}</span>
      {hint ? (
        <span className="mt-1 block font-sans text-[0.7rem] normal-case tracking-normal text-ink-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

function Question({
  n, title, children,
}: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rule-t pt-8">
      <legend className="label">
        <span className="tnum text-accent">{String(n).padStart(2, "0")}</span>
        <span className="mx-2">·</span>
        {title}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Card({ r, rank }: { r: Result; rank: number }) {
  return (
    <li className="rule-t pt-8">
      <p className="label">
        <span className="tnum text-accent">{String(rank).padStart(2, "0")}</span>
        {r.missing.length ? (
          <>
            <span className="mx-2">·</span>
            <span>NEEDS SETUP FIRST</span>
          </>
        ) : null}
      </p>

      <h3 className="t-subhead mt-3">{r.name}</h3>
      <p className="mt-3 max-w-prose text-body text-ink-muted">{r.thesis}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="label mb-2">Trigger</p>
          <p className="text-small text-ink-muted">{r.trigger}</p>
        </div>
        <div>
          <p className="label mb-2">Replaces</p>
          <p className="text-small text-ink-muted">{r.replaces}</p>
        </div>
      </div>

      <p className="label mb-3 mt-6">The loop</p>
      <ol className="space-y-2">
        {r.loop.map((step, i) => (
          <li key={step} className="flex gap-3 text-small text-ink-muted">
            <span className="tnum shrink-0 text-accent">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {r.wiring.length ? (
        <>
          <p className="label mb-2 mt-6">Sits on your stack</p>
          <p className="font-mono text-small text-ink-muted">
            {r.wiring.join("  ·  ")}
          </p>
        </>
      ) : null}

      {r.missing.length ? (
        <p className="mt-6 border-l-2 pl-4 text-small text-ink-muted"
           style={{ borderColor: "var(--accent)" }}>
          You would need {r.missing.join(" and ")} in place before this is buildable.
        </p>
      ) : null}

      <p className="label mb-2 mt-6">Where it breaks</p>
      <p className="max-w-prose text-small text-ink-muted">{r.breaks}</p>

      {r.skip ? (
        <p className="mt-6 border-l-2 pl-4 text-small text-ink"
           style={{ borderColor: "var(--rule)" }}>
          <span className="label mr-2">Honestly</span>
          {r.skip}
        </p>
      ) : null}
    </li>
  );
}

export default function AgentFit() {
  const [motion, setMotion] = useState<Motion>("sales");
  const [acv, setAcv] = useState<Acv>("high");
  const [team, setTeam] = useState<Team>("small");
  const [bottlenecks, setBottlenecks] = useState<Bottleneck[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [out, setOut] = useState<ReturnType<typeof recommend> | null>(null);
  const results = useRef<HTMLDivElement>(null);

  const toggle = <T,>(set: (f: (c: T[]) => T[]) => void, v: T) =>
    set((c) => (c.includes(v) ? c.filter((x) => x !== v) : [...c, v]));

  function run() {
    const answers: Answers = { motion, acv, team, bottlenecks, tools };
    setOut(recommend(answers));
    // Let the results render before scrolling to them.
    requestAnimationFrame(() =>
      results.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  return (
    <>
      <div className="space-y-10">
        <Question n={1} title="How do people buy from you?">
          {MOTIONS.map((m) => (
            <Chip key={m.id} name="motion" type="radio" label={m.label} hint={m.hint}
                  on={motion === m.id} onChange={() => setMotion(m.id)} />
          ))}
        </Question>

        <Question n={2} title="Average deal size">
          {ACVS.map((v) => (
            <Chip key={v.id} name="acv" type="radio" label={v.label} hint={v.hint}
                  on={acv === v.id} onChange={() => setAcv(v.id)} />
          ))}
        </Question>

        <Question n={3} title="How big is the GTM team?">
          {TEAMS.map((t) => (
            <Chip key={t.id} name="team" type="radio" label={t.label}
                  on={team === t.id} onChange={() => setTeam(t.id)} />
          ))}
        </Question>

        <Question n={4} title="What is actually slowing you down?">
          {BOTTLENECKS.map((b) => (
            <Chip key={b.id} name="bottleneck" type="checkbox" label={b.label} hint={b.hint}
                  on={bottlenecks.includes(b.id)}
                  onChange={() => toggle(setBottlenecks, b.id)} />
          ))}
        </Question>

        <Question n={5} title="What do you already run?">
          {TOOLS.map((t) => (
            <Chip key={t.id} name="tool" type="checkbox" label={t.label}
                  on={tools.includes(t.id)} onChange={() => toggle(setTools, t.id)} />
          ))}
        </Question>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button type="button" onClick={run} disabled={bottlenecks.length === 0} className="btn">
          Show me what to build
        </button>
        <p className="text-small text-ink-muted">
          {bottlenecks.length === 0
            ? "Pick at least one bottleneck in question 04."
            : "Runs in your browser. Nothing is sent anywhere."}
        </p>
      </div>

      <div ref={results} className="scroll-mt-20">
        {out ? (
          <section className="mt-16">
            <h2 className="t-subhead">
              {out.picks.length === 0
                ? "Nothing here is worth building yet"
                : out.picks.length === 1
                  ? "Build this one"
                  : "Build these, in this order"}
            </h2>

            {out.caution ? (
              <p className="mt-6 max-w-prose border-l-2 pl-4 text-body text-ink"
                 style={{ borderColor: "var(--accent)" }}>
                <span className="label mr-2 text-accent">Before you do</span>
                {out.caution}
              </p>
            ) : null}

            <ol className="mt-10 space-y-12">
              {out.picks.map((r, i) => (
                <Card key={r.id} r={r} rank={i + 1} />
              ))}
            </ol>

            <p className="mt-12 max-w-prose text-small text-ink-muted">
              This is a ranking, not a roadmap. It weighs your bottlenecks against
              your deal size, team size and the tools you already run, because the
              agent that gets finished is usually the one that sits on infrastructure
              you already have. It cannot see your data quality, which is the thing
              that actually decides whether any of them work.
            </p>
          </section>
        ) : null}
      </div>
    </>
  );
}
