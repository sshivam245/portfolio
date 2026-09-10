/**
 * Canonical site identity. Used by metadata, sitemap, robots, JSON-LD and
 * llms.txt so there is exactly one place that knows the public URL.
 *
 * Note the basePath is part of it — the site lives at /portfolio on GitHub
 * Pages, so every absolute URL must include it.
 */
export const SITE_URL = "https://sshivam245.github.io/portfolio";

export const SITE_NAME = "Shivam Goel";
export const SITE_TAGLINE = "Growth & GTM";

/** Absolute URL for a route path like "/work/aeo-geo". */
export const url = (path = "/") =>
  `${SITE_URL}${path === "/" ? "" : path}`;
