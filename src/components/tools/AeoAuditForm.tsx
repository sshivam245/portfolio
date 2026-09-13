"use client";

import { useState } from "react";
import { FORM_ENDPOINT, normaliseUrl, type SubmitState } from "@/lib/forms";
import { profile } from "@/content/profile";

const ENGINES = ["Google AI Overviews", "ChatGPT", "Perplexity", "Claude", "Gemini"];

export default function AeoAuditForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [engines, setEngines] = useState<string[]>([ENGINES[0]]);
  const [err, setErr] = useState<string | null>(null);

  const toggle = (e: string) =>
    setEngines((cur) => (cur.includes(e) ? cur.filter((x) => x !== e) : [...cur, e]));

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);

    // Bots fill every field they find. A human never sees this one.
    if (data.get("_honey")) return;

    const url = normaliseUrl(String(data.get("url") ?? ""));
    if (!url) {
      setErr("That does not look like a URL. A domain on its own is fine.");
      return;
    }

    setErr(null);
    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `AEO audit request: ${new URL(url).hostname}`,
          _template: "table",
          Site: url,
          Email: data.get("email"),
          Business: data.get("business"),
          Questions: data.get("questions"),
          Engines: engines.join(", ") || "not specified",
          Notes: data.get("notes"),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rule-t pt-8">
        <p className="label text-accent">Request received</p>
        <h2 className="t-subhead mt-3">I&apos;ll have this back to you within a day.</h2>
        <p className="mt-4 max-w-prose text-body text-ink-muted">
          It comes as a written report, not a dashboard: what an engine can currently
          do with your pages, the three things worth fixing first, and what I would
          leave alone. If I need a look at Search Console to answer properly, I&apos;ll
          ask before assuming.
        </p>
        <p className="mt-4 max-w-prose text-body text-ink-muted">
          Nothing goes on a list. There is no sequence behind this.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rule-t pt-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="url" className="label block">
            Your site <span className="text-accent">*</span>
          </label>
          <input
            id="url" name="url" required autoComplete="url"
            placeholder="yourcompany.com"
            aria-invalid={err ? true : undefined}
            className="field mt-2"
          />
          <p className="mt-2 text-small text-ink-muted">
            A specific page is more useful than a homepage if you have one in mind.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="label block">
            Where to send it <span className="text-accent">*</span>
          </label>
          <input
            id="email" name="email" type="email" required autoComplete="email"
            placeholder="you@company.com" className="field mt-2"
          />
        </div>

        <div>
          <label htmlFor="business" className="label block">What you sell</label>
          <input
            id="business" name="business"
            placeholder="One line is enough" className="field mt-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="questions" className="label block">
            Questions you want to be the answer to
          </label>
          <textarea
            id="questions" name="questions"
            placeholder={'e.g. "best CDP for a small data team", "how do I migrate off Segment"'}
            className="field mt-2"
          />
          <p className="mt-2 text-small text-ink-muted">
            The most useful thing on this form. Real buyer questions, not keywords.
          </p>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="label">Engines that matter to you</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {ENGINES.map((e) => {
              const on = engines.includes(e);
              return (
                <label key={e} className={`chip ${on ? "chip-on" : ""}`}>
                  <input
                    type="checkbox" checked={on} onChange={() => toggle(e)}
                    className="chip-input sr-only"
                  />
                  {e}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="label block">Anything else</label>
          <textarea id="notes" name="notes" placeholder="Optional" className="field mt-2" />
        </div>

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <input
          type="text" name="_honey" tabIndex={-1} autoComplete="off"
          aria-hidden className="hidden"
        />
      </div>

      {err ? (
        <p role="alert" className="mt-6 text-small text-accent">{err}</p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn">
          {state === "sending" ? "Sending…" : "Send it over"}
        </button>
        <p className="text-small text-ink-muted">
          One report. No list, no sequence.
        </p>
      </div>

      {state === "error" ? (
        <p role="alert" className="mt-6 max-w-prose text-small text-ink-muted">
          That did not go through, which is on me, not you. Send the URL straight to{" "}
          <a className="link" href={`mailto:${profile.email}?subject=AEO%20audit%20request`}>
            {profile.email}
          </a>{" "}
          and I&apos;ll treat it exactly the same.
        </p>
      ) : null}
    </form>
  );
}
