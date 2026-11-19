import { profile, experience, faqs } from "@/content/profile";
import { caseStudies } from "@/content/caseStudies";
import { SITE_NAME, url } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms-full.txt: the whole of every case study as plain text, for an agent
 * that wants the substance rather than the summary in /llms.txt. Context,
 * every build step, the outcomes and the reflection, with the URL each one
 * came from, so a quote can be attributed back to its page.
 *
 * Generated from the content files, so it cannot disagree with the site.
 */
export function GET() {
  const L: string[] = [];
  const push = (...lines: string[]) => L.push(...lines);

  push(`# ${SITE_NAME}: full case studies`, "");
  push(`> ${profile.statement}`, "");
  push(
    `${SITE_NAME} is a ${profile.role} (${profile.roleAlt}), currently ${experience[0].role} at ${experience[0].company}.`,
    `Site: ${url("/")} · Summary for agents: ${url("/llms.txt")}`,
    ""
  );

  for (const cs of caseStudies) {
    push(`## ${cs.title}`, "");
    push(`- URL: ${url(`/work/${cs.id}`)}`);
    push(`- Organisation: ${cs.org}, ${cs.timeframe}`);
    push(`- Category: ${cs.tag}`);
    if (cs.link) push(`- Live: ${cs.link.href}`);
    push("");
    push(cs.summary, "");
    push("### Context", "", cs.context, "");
    push("### What was built", "");
    cs.built.forEach((b, i) => push(`${i + 1}. ${b.step}${b.detail ? `: ${b.detail}` : ""}`));
    push("");
    push("### Outcomes", "");
    for (const o of cs.outcomes) push(`- ${o.value}: ${o.label}`);
    push("");
    if (cs.reflection) push("### What I'd do differently", "", cs.reflection, "");
    push(`Stack: ${cs.stack.join(", ")}`, "");
  }

  push("## Questions and answers", "");
  for (const f of faqs) push(`### ${f.q}`, "", f.a, "");

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
