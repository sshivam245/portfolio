import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { url } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Generated from the content files, so a new case study appears in the
 * sitemap automatically rather than being remembered by hand.
 *
 * Externally hosted posts are deliberately excluded — the canonical copy
 * lives on Medium and should not be claimed here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/writing"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    /* The runner at /tools/aeo-audit/run is deliberately absent: unlisted and noindex. */
    { url: url("/tools"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/tools/agent-fit"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/tools/aeo-audit"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...caseStudies.map((cs) => ({
      url: url(`/work/${cs.id}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
