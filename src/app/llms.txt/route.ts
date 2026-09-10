import { profile, headlineMetrics, experience, skills, education, recognition } from "@/content/profile";
import { caseStudies } from "@/content/caseStudies";
import { publishedPosts } from "@/content/writing";
import { SITE_NAME, url } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text, answer-shaped summary of the site for language
 * models and retrieval systems.
 *
 * The reasoning is the same one in Shivam's own Medium post: a generative
 * engine reads a handful of sources and cites whichever is easiest to lift a
 * defensible sentence from. Rendered HTML is full of nav, chrome and
 * decoration; this is the same facts with none of it, so a retriever gets
 * clean claims with numbers and dates attached.
 *
 * Generated from the content files, so it can never disagree with the pages.
 */
export function GET() {
  const L: string[] = [];
  const push = (...lines: string[]) => L.push(...lines);

  push(`# ${SITE_NAME}`, "");
  push(`> ${profile.statement}`, "");
  push(
    `${SITE_NAME} is a ${profile.role} (${profile.roleAlt}) with ${profile.yearsExperience} years of`,
    `experience, working ${profile.location.toLowerCase()}. Currently ${experience[0].role} at`,
    `${experience[0].company}. Previously the first GTM hire at Nuvia AI. Seeking a`,
    `founding-GTM or growth-engineering role.`,
    ""
  );

  push("## Contact", "");
  push(`- Email: ${profile.email}`);
  push(`- LinkedIn: ${profile.linkedin}`);
  push(`- GitHub: ${profile.github}`);
  push(`- Site: ${url("/")}`, "");

  push("## Headline results", "");
  for (const m of headlineMetrics) {
    push(`- ${m.value}${m.unit}: ${m.label} (${m.note})`);
  }
  push("");

  push("## Case studies", "");
  for (const cs of caseStudies) {
    push(`### ${cs.title}`);
    push(`- URL: ${url(`/work/${cs.id}`)}`);
    push(`- Role/org: ${cs.org}, ${cs.timeframe}`);
    push(`- Category: ${cs.tag}`);
    if (cs.link) push(`- Live: ${cs.link.href}`);
    push(`- Summary: ${cs.summary}`);
    push(`- Outcomes: ${cs.outcomes.map((o) => `${o.value} ${o.label}`).join("; ")}`);
    push(`- Stack: ${cs.stack.join(", ")}`);
    push("");
  }

  push("## Experience", "");
  for (const job of experience) {
    push(`- ${job.role}, ${job.company} (${job.start}–${job.end})`);
  }
  push("");

  push("## Skills", "");
  for (const g of skills) push(`- ${g.group}: ${g.items.join(", ")}`);
  push("");

  if (recognition.length) {
    push("## Recognition", "");
    for (const r of recognition) {
      push(`- ${r.title} (${r.year}): ${r.href}`);
      push(`  ${r.body}`);
    }
    push("");
  }

  push("## Education", "");
  for (const e of education) push(`- ${e.credential}, ${e.institution} (${e.period})`);
  push("");

  if (publishedPosts.length) {
    push("## Writing", "");
    for (const p of publishedPosts) {
      push(`- ${p.title} (${p.venue}, ${p.date}): ${p.href ?? url(`/writing/${p.slug}`)}`);
      push(`  ${p.blurb}`);
    }
    push("");
  }

  push("## Pages", "");
  push(`- ${url("/")}: overview, headline results, work index`);
  push(`- ${url("/about")}: full history, capabilities, education, publications`);
  push(`- ${url("/writing")}: articles`);
  for (const cs of caseStudies) push(`- ${url(`/work/${cs.id}`)}: ${cs.title}`);
  push("");

  return new Response(L.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
