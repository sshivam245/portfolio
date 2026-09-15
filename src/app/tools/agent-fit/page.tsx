import type { Metadata } from "next";
import Link from "next/link";
import AgentFit from "@/components/tools/AgentFit";
import Ledger from "@/components/dossier/Ledger";
import {
  ARCHETYPE_COUNT,
  QUESTION_COUNT,
  TOOL_COUNT,
} from "@/lib/agentfit/engine";

export const metadata: Metadata = {
  title: "Which GTM agent should you build?",
  description:
    "Answer five questions about your motion, deal size, team and stack. Get a ranked shortlist of GTM agents worth building, each with its trigger, its loop, and where it breaks.",
  alternates: { canonical: "/tools/agent-fit" },
  openGraph: {
    title: "Which GTM agent should you build?",
    description:
      "Five questions, a ranked shortlist of GTM agents worth building, and an honest note on where each one breaks.",
    type: "website",
    url: "/tools/agent-fit",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Which GTM agent should you build?" }],
  },
};

export default function AgentFitPage() {
  return (
    <article>
      <header className="shell py-12 sm:py-16">
        <Link href="/tools" className="label label-tap hover:text-accent transition-colors">
          ← Tools
        </Link>

        <p className="label label-tap mt-8">
          <span className="text-accent">FIVE QUESTIONS</span>
          <span className="mx-2">·</span>
          NO EMAIL
          <span className="mx-2">·</span>
          ANSWER IS INSTANT
        </p>

        {/* No ch cap, and the figures run underneath rather than standing
            in a bordered panel beside a shorter column. */}
        <h1 className="t-title mt-5">Which GTM agent is worth building?</h1>

        <p className="mt-6 max-w-prose text-body text-ink-muted">
          Most teams start with the agent that is most fun to build and abandon
          it three weeks later. The one that survives sits on data you already
          trust and removes a task someone repeats every week. This says which
          that is, including when the answer is to build nothing yet.
        </p>
      </header>

      <section className="rule-t">
        <div className="shell py-10">
          <Ledger
            items={[
              { value: String(QUESTION_COUNT), label: "questions, no email" },
              { value: String(ARCHETYPE_COUNT), label: "agent archetypes weighed" },
              { value: String(TOOL_COUNT), label: "tools it knows how to wire" },
              { value: "0", label: "of it leaves your browser" },
            ]}
          />
        </div>
      </section>

      <section className="rule-t">
        <div className="shell py-12">
          <AgentFit />
        </div>
      </section>

      <section className="rule-t">
        <div className="shell py-10">
          <Link href="/tools/aeo-audit" className="group block">
            <h2 className="label mb-2">Also here</h2>
            <p className="t-heading transition-colors duration-150 group-hover:text-accent">
              A free AEO audit of your site, written by a person
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
