import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/dossier/PageHero";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Two working tools: a ranked shortlist of the GTM agents worth building for your team, and a free written AEO audit of your site.",
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    href: "/tools/agent-fit",
    kicker: "Instant, no email",
    title: "Which GTM agent should you build?",
    blurb:
      "Five questions about your motion, deal size, team and stack. Returns a ranked shortlist, each with its trigger, its loop, the tools of yours it would sit on, and where it breaks. Sometimes it tells you to build nothing.",
    cta: "Answer five questions",
  },
  {
    href: "/tools/aeo-audit",
    kicker: "Free, back within a day",
    title: "What can an answer engine do with your site?",
    blurb:
      "Send a URL and I read the pages myself, against 23 checks that decide whether a passage can be retrieved, attributed and quoted. You get three fixes in priority order and an explicit list of what to leave alone.",
    cta: "Send a URL",
  },
];

export default function ToolsPage() {
  return (
    <article>
      <PageHero
        back={{ href: "/", label: "Home" }}
        kicker="Tools"
        title="Two tools, both free."
        lede="A portfolio that only talks about systems is asking to be taken on faith. These are the working versions. One answers instantly and asks for nothing. The other reaches me, because the useful version needs a person to read your pages."
      />

      <section className="tone-cream">
        <ul className="shell grid gap-5 py-16 sm:py-24 lg:grid-cols-2">
          {tools.map((t, i) => (
            <li key={t.href}>
              <Link href={t.href} className={`tool-panel group block h-full ${i === 0 ? "tone-blue" : "tone-zap"}`}>
                <p className="stage-tag">{t.kicker}</p>
                <h2 className="t-heading mt-4 max-w-[20ch]">{t.title}</h2>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-muted">{t.blurb}</p>
                <span className="btn mt-8">
                  {t.cta} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
