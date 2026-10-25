import Link from "next/link";
import Section from "./Section";
import { MOTIONS } from "@/lib/agentfit/engine";
import { BASE_PATH } from "@/lib/basePath";

/**
 * The homepage's one interactive door. Everything else here describes a
 * system that ran somewhere else; these two run now, which is a different
 * kind of claim.
 *
 * The agent-fit card starts the tool rather than advertising it. PRODUCT.md
 * names the mechanism a neighbouring portfolio cannot truthfully copy as "the
 * tools on this site actually run", and the homepage was describing them in
 * section 02, below the fold, while running nothing. The first question costs
 * nothing to inline: the engine is deterministic rules with no server, no key
 * and no model call, so answering here is a plain link that carries the
 * answer forward.
 */
const audit = {
  href: "/tools/aeo-audit",
  kicker: "Free, back within a day",
  title: "What can an answer engine do with your site?",
  blurb: "Send a URL. I read the pages and reply with three fixes, in order.",
};

export default function ToolsTeaser({ index = "02" }: { index?: string }) {
  return (
    <Section id="tools" index={index} title="Tools" aside="Working, not described">
      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        <li className="stagger-item">
          <p className="label text-ink-a">Instant, no email</p>
          <h3 className="t-subhead mt-3">Which GTM agent should you build?</h3>
          <p className="mt-3 max-w-prose text-body text-ink-muted">
            Five questions. A ranked shortlist, wired to the tools you already
            run. Start with the first one:
          </p>

          {/*
            Real answers, not a decorative preview. Each carries its choice to
            the tool as a query param, so the reader arrives one question in
            rather than at a blank form.
          */}
          <p className="label mt-6">How do people buy from you?</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {MOTIONS.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/tools/agent-fit?motion=${m.id}`}
                  className="chip press"
                >
                  <span>{m.label}</span>
                  <span className="mt-1 block font-sans text-[0.7rem] normal-case tracking-normal text-ink-muted">
                    {m.hint}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li className="stagger-item">
          <p className="label text-ink-a">{audit.kicker}</p>
          <h3 className="t-subhead mt-3">{audit.title}</h3>
          <p className="mt-3 max-w-prose text-body text-ink-muted">{audit.blurb}</p>

          {/*
            A plain GET form, so this starts the tool instead of linking to it.
            No client component, no state and no JavaScript: the browser turns
            the field into /tools/aeo-audit?url=... on submit, which the audit
            form reads and prefills. That matters on a static export, and it
            means the control still works if the JS never loads.

            The action carries BASE_PATH by hand. next/link adds it for us; a
            raw form action is not a Link, so on the GitHub Pages copy this
            would post to the wrong origin without it.
          */}
          <form
            action={`${BASE_PATH}/tools/aeo-audit`}
            method="get"
            className="mt-6"
          >
            <label htmlFor="teaser-url" className="label block">
              Your site
            </label>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <input
                id="teaser-url"
                name="url"
                autoComplete="url"
                placeholder="yourcompany.com"
                className="field min-w-0 flex-1"
              />
              <button type="submit" className="btn-ghost shrink-0">
                Check it
              </button>
            </div>
          </form>
        </li>
      </ul>
    </Section>
  );
}
