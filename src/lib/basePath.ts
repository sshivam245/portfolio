/**
 * The site deploys to GitHub Pages under /portfolio, so every asset reference
 * in /public needs this prefix. next.config.mjs sets the same value as
 * `basePath`, and it applies in dev too — keep the two in sync.
 */
export const BASE_PATH = "/portfolio";

/** Prefix a path in /public for the deployed base path. */
export const asset = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
