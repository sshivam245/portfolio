#!/usr/bin/env bash
# Deploy to Vercel production and prove the public URL actually moved.
#
# Vercel now treats shivamgoel.vercel.app as a project domain and reassigns it
# on each production deploy, so the alias step below is a fallback rather than
# the normal path. It stays because the failure it guards against is silent:
# a *.vercel.app subdomain pinned to one deployment keeps serving the old
# build, and once that build is no longer current Vercel answers with an SSO
# login redirect instead of the site — while the deploy reports success.
set -euo pipefail

ALIAS="${VERCEL_ALIAS:-shivamgoel.vercel.app}"

out=$(vercel deploy --prod --yes 2>&1 | tee /dev/stderr)

# The URL is on the "Production" line. `tail -1` looked obvious and was wrong:
# the CLI prints a trailing JSON hint block, so the last line is a brace.
url=$(printf '%s\n' "$out" \
  | grep -oE 'https://[a-z0-9-]+\.vercel\.app' \
  | grep -v "$ALIAS" | tail -1)

[ -n "$url" ] || { echo "could not find a deployment URL in the output" >&2; exit 1; }

# Only reassign if the alias is not already on this deployment.
if ! curl -sI "https://$ALIAS/" | grep -qi '^HTTP/2 200'; then
  echo "alias is not serving 200, reassigning to $url"
  vercel alias set "$url" "$ALIAS"
fi

code=$(curl -sL -o /dev/null -w '%{http_code}' "https://$ALIAS/")
[ "$code" = "200" ] || { echo "$ALIAS returned $code" >&2; exit 1; }

# The demo page is linked from a case study and 404'd on the first deploy,
# because Vercel serves clean URLs and the link carries .html.
demo=$(curl -sL -o /dev/null -w '%{http_code}' "https://$ALIAS/demos/gravitee-streamnative.html")
[ "$demo" = "200" ] || { echo "demo page returned $demo" >&2; exit 1; }

echo "live: https://$ALIAS  ->  $url"
