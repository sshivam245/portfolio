# Orbit logos

Chips fall back down a chain: **inline SVG path → image file → text label**.
That last step means the orbit always looks finished, even with
`public/logos/` empty.

## Already real (no action needed)

These come from the `simple-icons` package, imported directly in
`src/content/logos.ts` and rendered inline so they inherit `currentColor`:

Claude · n8n · HubSpot · Python · PostgreSQL (shown as "SQL") · GitHub Actions

## Still text — drop a file to upgrade

`simple-icons` doesn't carry these. Save an SVG into `public/logos/` with the
exact filename and it swaps in automatically.

| File | Label | Where to get it |
|---|---|---|
| `clay.svg` | Clay | clay.com press kit |
| `apollo.svg` | Apollo | apollo.io brand assets |
| `tableau.svg` | Tableau | Salesforce brand centre |
| `cloudsheer.svg` | Cloudsheer | your own company |
| `nuvia.svg` | Nuvia AI | ask them |
| `comviva.svg` | Comviva | comviva.com press |
| `ey.svg` | EY | ey.com brand |
| `lbs.svg` | LBS | london.edu brand |

## ⚠️ One trap

`simple-icons` has an **Apollo GraphQL** icon. That is a *different company*
from **Apollo.io**, the sales tool. Do not use it — `logos.ts` has a comment
marking this.

## What works best

- **SVG**, single colour, transparent background. Chips are 56–64px with the
  mark at ~28px, so detailed full-colour logos turn to mush.
- Monochrome reads best. Inline marks are drawn in `currentColor` on purpose,
  so a logo chip and a text chip look like the same object. A file with its
  own strong brand colour will break that — use the mono variant.
- PNG works too; change the extension in `logos.ts` to match.

## Using third-party marks

Showing logos of companies you worked for and tools you used is normal
portfolio practice — it states factual history. Keep two things right: use
each brand's own mark unmodified in shape, and don't imply endorsement or
current employment. The `note` field shows your actual role and dates on
hover, which keeps it unambiguous.
