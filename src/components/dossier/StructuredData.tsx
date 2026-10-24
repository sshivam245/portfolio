import { profile, experience, education, skills, recognition } from "@/content/profile";
import { caseStudies } from "@/content/caseStudies";
import { publishedPosts } from "@/content/writing";
import { CATEGORIES, CHECK_SPECS } from "@/lib/aeo/checks";
import { SITE_NAME, SITE_URL, url } from "@/lib/site";

/**
 * JSON-LD.
 *
 * This is the highest-leverage thing on the page for AEO and RAG. Prose has
 * to be inferred; this states outright that Shivam is a Person, what his job
 * title is, which organisations he has worked for, what he knows how to do,
 * and which pages are his work. A retrieval system gets those as facts
 * rather than guesses, and they are the facts most likely to be cited.
 *
 * Everything here is generated from the same content files the page renders,
 * so the markup can never drift from what a human reads — which is both the
 * honest thing and what search engines require.
 */

const PERSON_ID = `${SITE_URL}/#person`;

function Person() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    url: url("/"),
    email: `mailto:${profile.email}`,
    // Both the self-description and the employer title; the first matches
    // the linked LinkedIn headline, which helps an engine resolve them
    // as one person.
    jobTitle: [profile.role, experience[0].role],
    description: profile.statement,
    knowsAbout: skills.flatMap((g) => g.items),
    worksFor: {
      "@type": "Organization",
      name: experience[0].company,
    },
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
    hasOccupation: {
      "@type": "Occupation",
      name: "Growth & GTM Engineer",
      occupationLocation: { "@type": "Country", name: "Remote" },
      skills: skills.flatMap((g) => g.items).join(", "),
    },
    award: recognition.map((r) => r.title),
    subjectOf: recognition.map((r) => ({
      "@type": "Article",
      name: r.title,
      url: r.href,
    })),
    sameAs: [profile.linkedin, profile.github].filter(Boolean),
  };
  return <Script data={data} />;
}

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated from local content files, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Homepage: who this is, plus the work and writing as an itemised list. */
export function HomeSchema() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: url("/"),
    name: `${SITE_NAME} · ${profile.role}, ${profile.roleAlt}`,
    description: profile.statement,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: url("/"),
    mainEntity: { "@id": PERSON_ID },
  };

  const workList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected work",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: url(`/work/${cs.id}`),
      name: cs.title,
      description: cs.summary,
    })),
  };

  const writingList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Writing",
    itemListElement: publishedPosts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: p.href ?? url(`/writing/${p.slug}`),
      name: p.title,
      description: p.blurb,
    })),
  };

  return (
    <>
      <Person />
      <Script data={website} />
      <Script data={profilePage} />
      <Script data={workList} />
      <Script data={writingList} />
    </>
  );
}

/** A case study: an article authored by the Person, with its own outcomes. */
/* Static export, so this is stamped at build time and is accurate for the
   deployed copy: the page really did last change when the site was built. */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

export function CaseStudySchema({ slug }: { slug: string }) {
  const cs = caseStudies.find((c) => c.id === slug);
  if (!cs) return null;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.summary,
    url: url(`/work/${cs.id}`),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
    /*
     * The audit runner flagged these missing on our own pages, which is fair:
     * an undated article loses to a dated one on any question where currency
     * matters. Only the year is claimed, because only the year is known.
     * "2024 – 2025" resolves to its end year rather than inventing a month.
     */
    datePublished: cs.timeframe.match(/\d{4}(?!.*\d{4})/)?.[0],
    dateModified: BUILD_DATE,
    about: cs.stack,
    articleSection: cs.tag,
    // The outcomes as explicit facts rather than sentences to parse.
    mentions: cs.outcomes.map((o) => ({
      "@type": "Thing",
      name: `${o.value}: ${o.label}`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
      { "@type": "ListItem", position: 2, name: "Work", item: url("/#work") },
      { "@type": "ListItem", position: 3, name: cs.title, item: url(`/work/${cs.id}`) },
    ],
  };

  return (
    <>
      <Script data={article} />
      <Script data={breadcrumb} />
    </>
  );
}

/** The about page restates the Person with the full employment history. */
export function AboutSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: url("/about"),
    mainEntity: {
      "@id": PERSON_ID,
      "@type": "Person",
      name: SITE_NAME,
      hasCredential: education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        name: e.credential,
        recognizedBy: { "@type": "EducationalOrganization", name: e.institution },
      })),
    },
  };
  return (
    <>
      <Person />
      <Script data={data} />
    </>
  );
}

/**
 * The tool pages.
 *
 * These were the only pages on the site carrying no JSON-LD at all, which is
 * a strange omission on the two pages most likely to be retrieved: they are
 * the only ones phrased as a question somebody actually asks, rather than as
 * a name nobody searches for.
 *
 * The FAQ entries are the four category questions the audit page already
 * prints, answered by naming the checks in each group. Only marked up because
 * the question and its answer are both visible on the page; schema for
 * content a reader cannot see is the kind of thing that gets a site ignored,
 * which would be a poor advertisement for an AEO audit.
 */
export function AeoAuditSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url("/tools/aeo-audit")}#service`,
    name: "Free AEO audit",
    serviceType: "Answer engine optimisation audit",
    url: url("/tools/aeo-audit"),
    provider: { "@id": PERSON_ID },
    areaServed: "Worldwide",
    description:
      `A written answer-engine optimisation report on a submitted URL, covering ${CHECK_SPECS.length} checks across ${CATEGORIES.length} groups, returned within a day.`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url("/tools/aeo-audit")}#faq`,
    mainEntity: CATEGORIES.map((c) => ({
      "@type": "Question",
      name: c.blurb,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${c.label}. Checked by: ${CHECK_SPECS.filter((s) => s.category === c.id)
          .map((s) => s.label)
          .join(", ")}.`,
      },
    })),
  };

  return (
    <>
      <Script data={service} />
      <Script data={faq} />
      <Script data={toolBreadcrumb("Free AEO audit", "/tools/aeo-audit")} />
    </>
  );
}

/** agent-fit runs entirely in the browser, so it is an application, not a service. */
export function AgentFitSchema() {
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url("/tools/agent-fit")}#app`,
    name: "Which GTM agent should you build?",
    url: url("/tools/agent-fit"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Runs in the browser. No account, no email, no server.",
    author: { "@id": PERSON_ID },
    description:
      "Five questions about go-to-market motion, deal size, team size, bottlenecks and existing stack return a ranked shortlist of GTM agent archetypes, each with its trigger, its operating loop and its failure mode.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Script data={app} />
      <Script data={toolBreadcrumb("Which GTM agent should you build?", "/tools/agent-fit")} />
    </>
  );
}

function toolBreadcrumb(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
      { "@type": "ListItem", position: 2, name: "Tools", item: url("/tools") },
      { "@type": "ListItem", position: 3, name, item: url(path) },
    ],
  };
}
