/**
 * The deploy target's base path, for asset URLs under /public.
 *
 * Empty on Vercel, which serves at a domain root. "/portfolio" on GitHub
 * Pages, whose workflow sets NEXT_PUBLIC_BASE_PATH. next.config.mjs reads the
 * same variable and feeds it to Next as `basePath`, so a link built by
 * next/link and a path built by asset() always agree.
 *
 * Referenced as a full literal because Next inlines NEXT_PUBLIC_ variables by
 * textual substitution; pulling it off a destructured object would not work.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  "",
);

/** Prefix a path in /public for the deployed base path. */
export const asset = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
