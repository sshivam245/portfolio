# Orbit logos

The rings around the portrait currently render **text labels**, because
`public/logos/` is empty. Drop files in and they become logos automatically —
nothing else to change.

## How to add one

1. Find the official mark. Most companies have a press/brand page; for tools,
   [simpleicons.org](https://simpleicons.org) has clean single-colour SVGs.
2. Save it into `public/logos/` using the exact filename from
   `src/content/logos.ts`.
3. Reload. That's it.

## Filenames expected

**Inner ring — organisations**

| File | Label |
|---|---|
| `cloudsheer.svg` | Cloudsheer |
| `nuvia.svg` | Nuvia AI |
| `comviva.svg` | Comviva |
| `ey.svg` | EY |
| `lbs.svg` | LBS |

**Outer ring — tools**

| File | Label |
|---|---|
| `hubspot.svg` | HubSpot |
| `clay.svg` | Clay |
| `apollo.svg` | Apollo |
| `tableau.svg` | Tableau |
| `powerbi.svg` | Power BI |
| `python.svg` | Python |
| `sql.svg` | SQL |
| `github-actions.svg` | Actions |

## What works best

- **SVG**, single colour, transparent background. The chips are 56–64px with
  the mark at ~32px, so detailed full-colour logos turn to mush.
- If you only have a PNG, use a transparent one at 128px+ and change the
  extension in `src/content/logos.ts` to match.
- Monochrome marks read best against the dark ground. A logo with its own
  strong brand colour will fight the orange accent — desaturate it or use the
  white/mono variant most brands provide.

## A note on using these marks

Showing the logos of companies you actually worked for and tools you actually
used is normal portfolio practice — it states factual history. Two things to
keep right:

- Use each brand's own official mark, unmodified in shape.
- Don't imply endorsement, partnership, or that they employ you now. The
  `note` field in `logos.ts` shows your actual role and dates on hover, which
  keeps it unambiguous.

If you'd rather avoid the question entirely, the text labels are already a
perfectly good design — several strong portfolios (kevinshelly.com among them)
use no logos at all.
