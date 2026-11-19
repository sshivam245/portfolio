import Link from "next/link";
import Section from "./Section";
import { MOTIONS } from "@/lib/agentfit/engine";
import AuditTeaserForm from "@/components/tools/AuditTeaserForm";

/**
 * "Try before you buy": the two tools, side by side on lighter stock.
 *
 * Both start the tool rather than advertising it. The agent-fit panel asks
 * the first real question inline and carries the answer forward as a query
 * param; the audit panel emails the URL to the inbox the moment it is sent,
 * then opens the full form (a plain GET, so it still works with no JS).
 */
export default function ToolsTeaser() {
  return (
    <Section
      id="tools"
      tag="Free tools"
      title="Two tools you can use right now."
    >
      <ul className="grid gap-5 lg:grid-cols-2">
        <li className="tool-panel stagger-item">
          <p className="stage-tag">Instant, no email</p>
          <h3 className="t-heading mt-4">Which GTM agent should you build?</h3>
          <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-ink-muted">
            Five questions, a ranked shortlist, wired to the tools you already run.
            Start with the first one:
          </p>
          <p className="label mt-7">How do people buy from you?</p>
          {/* A grid, not a wrapping row: with their hints the chips are too
              wide to pair up in a flex row, so they stacked one per line and
              left the panel beside them half empty. */}
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {MOTIONS.map((m) => (
              <li key={m.id}>
                <Link href={`/tools/agent-fit?motion=${m.id}`} className="chip press h-full w-full">
                  <span>{m.label}</span>
                  <span className="mt-1 block text-[0.8125rem] font-medium normal-case tracking-normal text-ink-muted">
                    {m.hint}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li className="tool-panel stagger-item" style={{ "--i": 1 } as React.CSSProperties}>
          <p className="stage-tag">Free, back within a day</p>
          <h3 className="t-heading mt-4">What can an answer engine do with your site?</h3>
          <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-ink-muted">
            Send a URL. I read the pages myself and reply with three fixes, in order.
          </p>
          <AuditTeaserForm />
        </li>
      </ul>
    </Section>
  );
}
