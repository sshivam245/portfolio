import Section from "./Section";
import Link from "next/link";
import { faqs } from "@/content/profile";

/**
 * The questions people, and answer engines, ask about Shivam, each answered
 * so it still makes sense lifted out on its own. The FAQPage schema on this
 * route is generated from the same list, so nothing is marked up that a
 * reader cannot see.
 */
export default function AboutFaq() {
  return (
    <Section id="faq" tag="Questions" title="The short answers.">
      {/* Headings, not a <dl>: a heading may not sit inside a <dt>, and the
          question as a real heading is what an engine keys the answer to. */}
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
        {faqs.map((f) => (
          <div key={f.q} className="min-w-0">
            <h3 className="t-subhead">{f.q}</h3>
            {/* break-words: an answer can carry a bare URL, which has no
                break point and pushed the page wide at 200% text. */}
            <p className="mt-3 max-w-prose break-words text-base leading-relaxed text-ink-muted">{f.a}</p>
            {f.link ? (
              <Link href={f.link.href} className="link mt-3 inline-block text-base font-semibold">
                {f.link.label} →
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
