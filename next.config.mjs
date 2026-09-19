/**
 * The base path is set by the deploy target, not hardcoded.
 *
 * Vercel serves at a domain root, so it needs no prefix and gets the default.
 * GitHub Pages serves the repo under /portfolio, so its workflow sets
 * NEXT_PUBLIC_BASE_PATH explicitly. src/lib/basePath.ts reads the same
 * variable, so the two can never drift.
 *
 * NEXT_PUBLIC_ matters: the value is also needed in browser code, and Next
 * only inlines variables with that prefix.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    // No Image Optimization server behind a static export.
    unoptimized: true,
  },
};

export default nextConfig;
