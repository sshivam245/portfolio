"use client";

import { useState } from "react";
import {
  byCategory, runChecks, scoreOf, verdict,
  type Finding, type Status,
} from "@/lib/aeo/checks";

const DOT: Record<Status, string> = {
  pass: "var(--ink-muted)",
  warn: "var(--accent)",
  fail: "var(--accent)",
  info: "var(--rule)",
};
const WORD: Record<Status, string> = {
  pass: "OK", warn: "WEAK", fail: "BROKEN", info: "N/A",
};

/** The report draft, already in the order the email should make its case. */
function toMarkdown(findings: Finding[], url: string) {
  const s = scoreOf(findings);
  const v = verdict(s);
  const rank: Status[] = ["fail", "warn", "pass", "info"];
  const sorted = [...findings].sort(
    (a, b) => rank.indexOf(a.status) - rank.indexOf(b.status) || b.weight - a.weight,
  );
  const broken = sorted.filter((f) => f.status === "fail");
  const weak = sorted.filter((f) => f.status === "warn");

  const lines: string[] = [
    `# AEO read: ${url || "(pasted source)"}`,
    "",
    `**${v.word}** — ${v.note} (${Math.round(s * 100)}% of weighted checks)`,
    "",
    "## Fix these first",
    "",
  ];

  const top = [...broken, ...weak].slice(0, 3);
  top.forEach((f, i) => {
    lines.push(`**${i + 1}. ${f.label}** — ${f.found}`);
    lines.push(`${f.why}`);
    if (f.fix) lines.push(`_Do this:_ ${f.fix}`);
    lines.push("");
  });

  lines.push("## Leave alone", "");
  lines.push(
    sorted.filter((f) => f.status === "pass").map((f) => `- ${f.label}: ${f.found}`).join("\n") ||
      "- Nothing is currently passing.",
  );
  lines.push("", "## Everything checked", "");
  byCategory(findings).forEach((c) => {
    lines.push(`### ${c.label}`, "");
    c.items.forEach((f) => {
      lines.push(`- **${f.label}** (${WORD[f.status]}): ${f.found}${f.fix ? ` — ${f.fix}` : ""}`);
    });
    lines.push("");
  });
  return lines.join("\n");
}

export default function AeoRunner() {
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");
  const [robots, setRobots] = useState("");
  const [llms, setLlms] = useState<boolean | null>(null);
  const [findings, setFindings] = useState<Finding[] | null>(null);
  const [copied, setCopied] = useState(false);

  function run() {
    if (!html.trim()) return;
    setFindings(runChecks(html, url, { robots: robots.trim() ? robots : null, llms }));
    setCopied(false);
  }

  async function copy() {
    if (!findings) return;
    await navigator.clipboard.writeText(toMarkdown(findings, url));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const score = findings ? scoreOf(findings) : 0;
  const v = findings ? verdict(score) : null;

  return (
    <>
      <div className="space-y-6">
        <div>
          <label htmlFor="r-url" className="label block">Page URL</label>
          <input id="r-url" value={url} onChange={(e) => setUrl(e.target.value)}
                 placeholder="https://example.com/pricing" className="field mt-2" />
          <p className="mt-2 text-small text-ink-muted">
            Used to tell internal links from outbound ones. Optional.
          </p>
        </div>

        <div>
          <label htmlFor="r-html" className="label block">Page source</label>
          <textarea id="r-html" value={html} onChange={(e) => setHtml(e.target.value)}
                    placeholder="Paste view-source here"
                    className="field mt-2 min-h-[10rem] font-mono text-small" />
          <p className="mt-2 text-small text-ink-muted">
            View source, select all, paste. Served HTML, not the rendered DOM: that
            is what a crawler without JavaScript sees, which is the point.
          </p>
        </div>

        <div>
          <label htmlFor="r-robots" className="label block">robots.txt</label>
          <textarea id="r-robots" value={robots} onChange={(e) => setRobots(e.target.value)}
                    placeholder="Optional, but it is the check that overrides the others"
                    className="field mt-2 font-mono text-small" />
        </div>

        <fieldset>
          <legend className="label">llms.txt</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {[["Present", true], ["Absent", false], ["Did not check", null]].map(
              ([label, val]) => (
                <label key={String(label)}
                       className={`chip ${llms === val ? "chip-on" : ""}`}>
                  <input type="radio" name="llms" checked={llms === val}
                         onChange={() => setLlms(val as boolean | null)}
                         className="chip-input sr-only" />
                  {label}
                </label>
              ),
            )}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="button" onClick={run} disabled={!html.trim()} className="btn">
          Run checks
        </button>
        {findings ? (
          <button type="button" onClick={copy} className="btn-ghost">
            {copied ? "Copied" : "Copy report draft"}
          </button>
        ) : null}
      </div>

      {findings && v ? (
        <section className="mt-14">
          <div className="rule-t pt-8">
            <p className="label">Verdict</p>
            <p className="t-metric mt-2 text-accent">{Math.round(score * 100)}%</p>
            <p className="t-subhead mt-2">{v.word}</p>
            <p className="mt-2 max-w-prose text-body text-ink-muted">{v.note}</p>
          </div>

          {byCategory(findings).map((c) => (
            <div key={c.id} className="rule-t mt-10 pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="label text-accent">{c.label}</h2>
                <p className="label tnum">{Math.round(c.score * 100)}%</p>
              </div>
              <ul className="mt-5 space-y-5">
                {c.items.map((f) => (
                  <li key={f.id}>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="dot mt-[0.45em]"
                            style={{ background: DOT[f.status] }} aria-hidden />
                      <span className="text-body text-ink">{f.label}</span>
                      <span className="label">{WORD[f.status]}</span>
                    </div>
                    <p className="ml-5 mt-1 font-mono text-small text-ink-muted">{f.found}</p>
                    {f.fix ? (
                      <p className="ml-5 mt-1 max-w-prose text-small text-ink">{f.fix}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}
    </>
  );
}
