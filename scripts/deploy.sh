#!/usr/bin/env bash
# Deploy to Vercel production and move the public alias onto the new build.
#
# The second step is not optional. shivamgoel.vercel.app is a *.vercel.app
# subdomain, which Vercel pins to one specific deployment rather than
# treating as a project domain that follows production. Deploy without
# re-aliasing and the nice URL keeps serving the previous build until that
# build ages out, at which point Vercel decides it is no longer current and
# answers with an SSO login redirect instead of the site. That failure is
# silent: the deploy reports success and the URL people actually have breaks.
#
# Connecting the GitHub repo in the Vercel dashboard makes production domains
# follow deploys automatically and retires this script.
set -euo pipefail

ALIAS="${VERCEL_ALIAS:-shivamgoel.vercel.app}"

url=$(vercel deploy --prod --yes | tail -1 | tr -d '[:space:]')
case "$url" in
  https://*) ;;
  *) echo "deploy did not return a URL: $url" >&2; exit 1 ;;
esac

vercel alias set "$url" "$ALIAS"

code=$(curl -sL -o /dev/null -w '%{http_code}' "https://$ALIAS/")
[ "$code" = "200" ] || { echo "$ALIAS returned $code after aliasing" >&2; exit 1; }
echo "live: https://$ALIAS  ->  $url"
