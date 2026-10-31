import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/dossier/PageHero";
import { notFound } from "next/navigation";
import Figure from "@/components/dossier/Figure";
import FigureHero from "@/components/dossier/FigureHero";
import BuildFlow from "@/components/dossier/BuildFlow";
import InlineDiagram from "@/components/dossier/InlineDiagram";
import Ledger from "@/components/dossier/Ledger";
import { caseStudies } from "@/content/caseStudies";
import { asset } from "@/lib/basePath";
import { CaseStudySchema } from "@/components/dossier/StructuredData";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.id }));
}

/**
 * Meta descriptions get truncated around 160 characters. Several summaries
 * run past 240 and were being cut mid-clause, so the snippet ended on a
 * fragment. Cut at the last word boundary instead, and only for the tag:
 * the full summary still renders on the page.
 */
function metaDescription(summary: string) {
  if (summary.length <= 160) return summary;
  const cut = summary.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cs = caseStudies.find((c) => c.id === params.slug);
  if (!cs) return {};
  const description = metaDescription(cs.summary);
  return {
    title: cs.title,
    description,
    alternates: { canonical: `/work/${cs.id}` },
    openGraph: {
      title: cs.title,
      description,
      type: "article",
      url: `/work/${cs.id}`,
      // Defining openGraph here REPLACES the layout's, images included —
      // so it has to be restated or shares render blank.
      images: [{ url: `/og/work-${cs.id}.png`, width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description,
      images: [`/og/work-${cs.id}.png`],
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = caseStudies.findIndex((c) => c.id === params.slug);
  if (index === -1) notFound();
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const diagrams = cs.figures?.filter((f) => f.diagram) ?? [];
  const hero = cs.figures?.find((f) => f.hero && !f.diagram);
  // The hero is shown in its own band, so it must not also appear in the aside.
  const shots = cs.figures?.filter((f) => !f.diagram && !f.hero) ?? [];

  return (
    <article>
      <CaseStudySchema slug={cs.id} />
      {/*
        The title carries the hero, at display size and the full width of the
        page.

        Every version before this constrained it to 18 characters and then
        tried to fill the leftover 45% with something: first nothing, then a
        bordered panel of outcomes, which was a card this design does not use
        and which, being taller than the text beside it, only moved the empty
        space underneath. The hole was never on the right. It was that the
        largest thing on the page had been told not to grow.

        The figures run underneath as a full-width ledger instead, which is
        where four numbers read best anyway.
      */}
      <PageHero
        back={{ href: "/#work", label: "All the work" }}
        kicker={`${cs.tag} · ${cs.org}, ${cs.timeframe}`}
        title={cs.title}
        lede={cs.summary}
      >
        {cs.link ? (
          <a
            /* A root-relative href points at a file in /public and needs the
               basePath; a plain <a> does not get it the way next/link does. */
            href={cs.link.href.startsWith("/") ? asset(cs.link.href) : cs.link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="live-bar btn mt-9 max-w-full"
          >
            <span className="shrink-0">See it live</span>
            {/* break-all: the URL wraps inside itself at 375px instead of
                pushing the button wider than the screen. */}
            <span className="min-w-0 break-all font-semibold opacity-80">{cs.link.label}</span>
            <span aria-hidden className="live-arrow shrink-0">↗</span>
          </a>
        ) : null}
      </PageHero>

      {/* The result, in the colour the funnel uses for "this stage is live". */}
      <section className="tone-zap">
        <div className="shell py-12 sm:py-16">
          <h2 className="stage-tag mb-8">What came out of it</h2>
          <Ledger items={cs.outcomes} verifiedFirst={cs.verified} />
        </div>
      </section>

      {/*
        The proof, immediately after the numbers that claim it. The reader has
        just been told the outcome; this is the artefact, at a size that lets
        them check it rather than take it on trust.
      */}
      {hero ? (
        <section className="tone-cream">
          <div className="shell pt-14">
            <FigureHero figure={hero} />
          </div>
        </section>
      ) : null}

      {/*
        Diagrams run inline under the context, where the flow explains the
        argument being made right above it. Screenshots go in the right
        column: they are evidence to glance at, not a step to follow, and
        they give the column something to hold.
      */}
      <section className="tone-cream">
        <div className="shell grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14">
          {/*
            min-w-0: a grid item defaults to min-width:auto, so the diagram's
            648px min-width was forcing the whole grid wider than the phone
            and pushing the page into horizontal scroll. With this the column
            can shrink and the diagram scrolls inside its own wrapper instead.
          */}
          <div className="min-w-0 lg:col-span-7">
            <h2 className="stage-tag mb-4">Context</h2>
            <p className="max-w-prose text-lg leading-relaxed">{cs.context}</p>

            {diagrams.map((f) => (
              <InlineDiagram key={f.src} figure={f} />
            ))}

            <h2 className="stage-tag mb-6 mt-12">What I built</h2>
            <BuildFlow steps={cs.built} />

            {cs.reflection ? (
              <>
                <h2 className="stage-tag mb-4 mt-12">What I&apos;d do differently</h2>
                <p className="max-w-prose text-lg leading-relaxed">
                  {cs.reflection}
                </p>
              </>
            ) : null}
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <h2 className="stage-tag mb-4">Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {cs.stack.map((t) => (
                <li key={t} className="stage-pill !min-h-0 !py-1.5">{t}</li>
              ))}
            </ul>
            {shots.map((f) => (
              <Figure key={f.src} figure={f} />
            ))}
          </aside>
        </div>
      </section>

      {/* Next case study, so the page doesn't dead-end. */}
      <section className="tone-blue">
        <div className="shell py-14 sm:py-20">
          <Link href={`/work/${next.id}`} className="group flex items-center justify-between gap-6">
            <span className="min-w-0">
              <span className="stage-tag">Next case study</span>
              <span className="t-title mt-5 block max-w-[20ch]">{next.title}</span>
            </span>
            <span className="work-arrow shrink-0" aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
