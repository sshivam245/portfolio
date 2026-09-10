import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localPosts, formatDate } from "@/content/writing";

/** Required for `output: export` — pre-renders one page per local post. */
export function generateStaticParams() {
  return localPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = localPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Shivam Goel`,
    description: post.blurb,
    openGraph: { title: post.title, description: post.blurb, type: "article" },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = localPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="shell py-14 sm:py-20">
      <Link href="/writing" className="label hover:text-accent transition-colors">
        ← All writing
      </Link>

      <header className="mt-8 max-w-prose">
        <p className="label mb-4">
          {formatDate(post.date)}
          <span className="mx-2 text-accent">·</span>
          {post.tags.join(" · ")}
        </p>
        <h1 className="text-h1 font-semibold">{post.title}</h1>
      </header>

      <div className="rule-t mt-8 max-w-prose pt-8">
        {post.body?.map((para) => (
          <p key={para.slice(0, 40)} className="mb-5 text-body last:mb-0">
            {para}
          </p>
        ))}
      </div>

      <footer className="rule-t mt-12 max-w-prose pt-6">
        <Link href="/writing" className="label hover:text-accent transition-colors">
          ← All writing
        </Link>
      </footer>
    </article>
  );
}
