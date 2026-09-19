/**
 * Canonical site identity. Used by metadata, sitemap, robots, JSON-LD and
 * llms.txt so there is exactly one place that knows the public URL.
 *
 * Set NEXT_PUBLIC_SITE_URL per deploy target. It must include the base path
 * when there is one, because every absolute URL is built from it.
 *
 * One rule worth keeping: every deploy of this site should point its
 * canonical at the SAME origin. Two live copies each declaring themselves
 * canonical is duplicate content, and this site's whole argument is that its
 * author knows better.
 */
const DEFAULT_SITE_URL = "https://shivamgoel.vercel.app";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, "");

export const SITE_NAME = "Shivam Goel";
export const SITE_TAGLINE = "Growth & GTM";

/** Absolute URL for a route path like "/work/aeo-geo". */
export const url = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
