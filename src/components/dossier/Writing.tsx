import Link from "next/link";
import Section from "./Section";
import { publishedPosts, formatDate } from "@/content/writing";

/**
 * Numbered list of posts, same dossier grammar as the work index.
 *
 * `limit` shows only the most recent few, for the homepage; the full list
 * lives at /writing.
 */
export default function Writing({
  index = "02",
  limit,
}: {
  index?: string;
  limit?: number;
}) {
  if (!publishedPosts.length) return null;

  const posts = limit ? publishedPosts.slice(0, limit) : publishedPosts;
  const hasMore = limit != null && publishedPosts.length > limit;
  const n = publishedPosts.length;
  const plural = `${n} post${n === 1 ? "" : "s"}`;

  return (
    <Section
      id="writing"
      index={index}
      title="Writing"
      aside={
        hasMore ? (
          <Link href="/writing" className="hover:text-accent transition-colors">
            All {plural} →
          </Link>
        ) : (
          plural
        )
      }
    >
      <ol className="rule-t">
        {posts.map((post, i) => {
          const external = Boolean(post.href);
          const href = post.href ?? `/writing/${post.slug}`;

          const inner = (
            <>
              <span className="label tnum shrink-0 pt-1 sm:w-10">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[1.5rem] font-normal leading-tight tracking-[-0.01em] group-hover:text-accent transition-colors duration-150">
                    {post.title}
                  </span>
                  {external ? (
                    <span className="label group-hover:text-accent transition-colors">
                      {post.venue} ↗
                    </span>
                  ) : null}
                </span>

                <span className="mt-2 block max-w-prose text-small text-ink-muted">
                  {post.blurb}
                </span>

                <span className="label mt-3 block">
                  {formatDate(post.date)}
                  <span className="mx-2 text-accent">·</span>
                  {post.tags.join(" · ")}
                </span>
              </span>

              <span
                aria-hidden
                className="mt-3 hidden h-px w-6 shrink-0 bg-accent transition-all duration-200 group-hover:w-12 sm:block"
              />
            </>
          );

          const cls = "group flex gap-4 rule-b py-6 sm:gap-6 items-start";

          return (
            <li key={post.slug}>
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
