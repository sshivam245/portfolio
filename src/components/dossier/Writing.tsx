import Link from "next/link";
import Section from "./Section";
import { publishedPosts, formatDate } from "@/content/writing";
import { indexLine } from "@/lib/text";

/**
 * Posts, as big rows. On the homepage this is the nurture content: the
 * thing you send a lead who is interested but not ready.
 *
 * `limit` shows only the most recent few; the full list lives at /writing.
 */
export default function Writing({
  limit,
  tag = "Touchpoint 4 · Nurture content",
  title = "Reading material, for the thorough.",
}: {
  limit?: number;
  tag?: string;
  title?: React.ReactNode;
}) {
  if (!publishedPosts.length) return null;

  const posts = limit ? publishedPosts.slice(0, limit) : publishedPosts;
  const hasMore = limit != null && publishedPosts.length > limit;

  return (
    <Section
      id="writing"
      tag={tag}
      title={title}
      aside={
        hasMore ? (
          <Link href="/writing" className="link">
            All {publishedPosts.length} posts →
          </Link>
        ) : null
      }
    >
      <ol className="grid gap-4">
        {posts.map((post, i) => {
          const external = Boolean(post.href);
          const href = post.href ?? `/writing/${post.slug}`;

          const inner = (
            <>
              <span className="min-w-0 flex-1">
                <span className="label block">
                  {formatDate(post.date)}
                  <span className="mx-2">·</span>
                  {post.tags.join(" · ")}
                  {external ? (
                    <>
                      <span className="mx-2">·</span>
                      {post.venue} ↗
                    </>
                  ) : null}
                </span>
                <span className="t-heading mt-3 block">{post.title}</span>
                <span className="mt-3 block max-w-[60ch] text-base leading-relaxed text-ink-muted">
                  {limit ? indexLine(post.blurb) : post.blurb}
                </span>
              </span>
              <span className="work-arrow" aria-hidden>
                →
              </span>
            </>
          );

          const cls = "post-card group";

          return (
            <li key={post.slug} className="stagger-item" style={{ "--i": i } as React.CSSProperties}>
              {external ? (
                <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link href={href} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
