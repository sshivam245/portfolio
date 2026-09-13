import Link from "next/link";
import Section from "./Section";

/**
 * The homepage's one interactive door. Everything else here describes a
 * system that ran somewhere else; these two run now, which is a different
 * kind of claim.
 */
const items = [
  {
    href: "/tools/agent-fit",
    kicker: "Instant, no email",
    title: "Which GTM agent should you build?",
    blurb:
      "Five questions. A ranked shortlist with each agent's trigger, loop and failure mode, weighed against the tools you already run.",
  },
  {
    href: "/tools/aeo-audit",
    kicker: "Free, back within a day",
    title: "What can an answer engine do with your site?",
    blurb:
      "Send a URL. I read the pages against 23 checks and reply with three fixes in priority order, plus what to leave alone.",
  },
];

export default function ToolsTeaser({ index = "02" }: { index?: string }) {
  return (
    <Section id="tools" index={index} title="Tools" aside="Working, not described">
      <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {items.map((t) => (
          <li key={t.href} className="stagger-item">
            <Link href={t.href} className="group block">
              <p className="label text-accent">{t.kicker}</p>
              <h3 className="t-subhead mt-3 transition-colors duration-150 group-hover:text-accent">
                {t.title}
              </h3>
              <p className="mt-3 max-w-prose text-body text-ink-muted">{t.blurb}</p>
              <p className="label mt-5 inline-flex items-center gap-2 text-ink">
                Open
                <span
                  aria-hidden
                  className="h-px w-12 origin-left scale-x-50 bg-accent transition-transform duration-200 group-hover:scale-x-100"
                />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
