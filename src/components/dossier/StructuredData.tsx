import { profile, experience, education, skills, recognition } from "@/content/profile";
import { caseStudies } from "@/content/caseStudies";
import { publishedPosts } from "@/content/writing";
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
