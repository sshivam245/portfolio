# Orbit logos

Chips fall back: **inline SVG path → image file → text label**.

## Real logos (7) — done

Rendered inline in `currentColor`, so they match the text chips:

| Mark | Source |
|---|---|
| Claude, n8n, HubSpot, Python, PostgreSQL (shown "SQL"), GitHub Actions | `simple-icons` package |
| Tableau | Ionicons set via Wikimedia Commons (MIT) |

## Still text (7) — need files from you

Save into `public/logos/` with the exact filename and it swaps in
automatically. No code change needed.

| File | Label | Why it's not done |
|---|---|---|
| `clay.svg` | Clay | Not in any open icon set. Needs clay.com brand assets. |
| `apollo.svg` | Apollo | Same. **Must be apollo.io, not Apollo GraphQL.** |
| `cloudsheer.svg` | Cloudsheer | Private company — only you have this. |
| `nuvia.svg` | Nuvia AI | Private company — only you have this. |
| `comviva.svg` | Comviva | Commons has only a wide wordmark. |
| `ey.svg` | EY | Commons version bundles the "Building a better working world" tagline. Need the bare beam+EY mark. |
| `lbs.svg` | LBS | Commons version is a navy block with three lines of text. |

## What to send

A **square, single-colour, transparent** SVG per brand — the icon/monogram,
not the horizontal wordmark. Chips are 56–64px with the mark at ~28px, so:

- ✅ A monogram or symbol (EY's beam, a favicon-style mark)
- ❌ A wordmark with the company name spelled out — unreadable at this size
- ❌ A logo locked up with a tagline
- ❌ A logo on a solid coloured background plate

Monochrome white or black works best; brand colours at 28px on a near-black
ground just turn to noise. PNG is fine too — change the extension in
`src/content/logos.ts` to match.

**If a brand only has a wordmark**, tell me and I'll switch the inner ring to
wide pill-shaped chips instead of circles, which fit wordmarks properly. The
text labels are also a perfectly respectable end state — kevinshelly.com uses
no logos at all.

## ⚠️ Trap

`simple-icons` has an "Apollo" icon, but it is **Apollo GraphQL** — a
different company from **Apollo.io**. `logos.ts` has a comment marking this
so nobody wires it up by mistake.

## Using third-party marks

Showing logos of companies you worked for and tools you used is normal
portfolio practice — it states factual history. Use each brand's own mark
unmodified in shape, and don't imply endorsement or current employment. The
`note` field shows your real role and dates on hover, which keeps it
unambiguous.
