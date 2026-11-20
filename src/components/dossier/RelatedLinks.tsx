import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";
import { publishedPosts } from "@/content/writing";

const TOOLS = {
  "/tools/aeo-audit": "Get a free AEO audit of your own site",
  "/tools/agent-fit": "Find the GTM agent worth building for your team",
} as const;

/**
 * "Keep reading": the related case studies, the writing on the same subject,
 * and the tool that applies it. Hand-picked per case study in
 * caseStudies.ts, so every link is one a reader of this page would want, and
 * every case study is linked from at least one other.
 *
 * Plain links with descriptive text, not "click here": the anchor text is
 * what tells a crawler what the target is about.
 */
export default function RelatedLinks({ cs }: { cs: CaseStudy }) {
  if (!cs.related) return null;
  const work = cs.related.work
    .map((id) => caseStudies.find((c) => c.id === id))
    .filter((c): c is CaseStudy => Boolean(c));
  const posts = (cs.related.posts ?? [])
    .map((key) => publishedPosts.find((p) => p.slug.startsWith(key) || p.href?.includes(key)))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const tool = cs.related.tool;

  return (
    <nav aria-labelledby="related-heading" className="mt-12">
      <h2 id="related-heading" className="stage-tag mb-4">Keep reading</h2>
      <ul className="grid gap-4">
        {work.map((c) => (
          <li key={c.id}>
            <Link href={`/work/${c.id}`} className="group block">
              <span className="label block">Case study · {c.tag}</span>
              <span className="mt-1 block font-semibold transition-colors duration-150 group-hover:text-ink-a group-focus-visible:text-ink-a">
                {c.title}
              </span>
            </Link>
          </li>
        ))}
        {posts.map((p) => (
          <li key={p.slug}>
            <a
              href={p.href ?? `/writing/${p.slug}`}
              {...(p.href ? { target: "_blank", rel: "noopener" } : {})}
              className="group block"
            >
              <span className="label block">Writing · {p.venue}</span>
              <span className="mt-1 block font-semibold transition-colors duration-150 group-hover:text-ink-a group-focus-visible:text-ink-a">
                {p.title}
                {p.href ? " ↗" : ""}
              </span>
            </a>
          </li>
        ))}
        {tool ? (
          <li>
            <Link href={tool} className="group block">
              <span className="label block">Free tool</span>
              <span className="mt-1 block font-semibold transition-colors duration-150 group-hover:text-ink-a group-focus-visible:text-ink-a">
                {TOOLS[tool]}
              </span>
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
