import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Two working tools: a ranked shortlist of the GTM agents worth building for your team, and a free written AEO audit of your site.",
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    href: "/tools/agent-fit",
    kicker: "INSTANT · NO EMAIL",
    title: "Which GTM agent should you build?",
    blurb:
      "Five questions about your motion, deal size, team and stack. Returns a ranked shortlist, each with its trigger, its loop, the tools of yours it would sit on, and where it breaks. Sometimes it tells you to build nothing.",
    cta: "Answer five questions",
  },
  {
    href: "/tools/aeo-audit",
    kicker: "FREE · BACK WITHIN A DAY",
    title: "What can an answer engine do with your site?",
    blurb:
      "Send a URL and I read the pages myself, against 23 checks that decide whether a passage can be retrieved, attributed and quoted. You get three fixes in priority order and an explicit list of what to leave alone.",
    cta: "Send a URL",
  },
];

export default function ToolsPage() {
  return (
    <article>
      <header className="shell py-12 sm:py-16">
        <p className="label label-tap">Tools</p>
        <h1 className="t-title mt-4 max-w-[17ch]">
          Two things that do something, rather than describe it
        </h1>
        <p className="mt-6 max-w-prose text-body text-ink-muted">
          A portfolio that only talks about systems is asking to be taken on faith.
          These are the working versions. One answers instantly in your browser and
          asks for nothing. The other reaches me, because the useful version of it
          needs a person to read your pages.
        </p>
      </header>

      {tools.map((t) => (
        <section key={t.href} className="rule-t">
          <div className="shell py-12">
            <Link href={t.href} className="group block">
              <p className="label">
                <span className="text-accent">{t.kicker.split(" · ")[0]}</span>
                <span className="mx-2">·</span>
                {t.kicker.split(" · ")[1]}
              </p>
              <h2 className="t-heading mt-4 max-w-[20ch] transition-colors duration-150 group-hover:text-accent">
                {t.title}
              </h2>
              <p className="mt-5 max-w-prose text-body text-ink-muted">{t.blurb}</p>
              <p className="link label-tap mt-6 inline-flex items-center gap-2 text-body">
                {t.cta}
                <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          </div>
        </section>
      ))}
    </article>
  );
}
