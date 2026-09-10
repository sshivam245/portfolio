# Orbit logos

Chips fall back: **inline SVG path → image file → text label**.

## Done — 13 of 14

**From your supplied files** (`~/Desktop/logos`), cropped to the icon and
normalised to 256px:

| File | Notes |
|---|---|
| `clay.png` | 3D arch icon, cropped out of the lockup |
| `apollo.png` | Yellow starburst, cropped out of the lockup |
| `cloudsheer.png` | Cloud + S mark, cropped out of the lockup |
| `nuvia.png` | Square app icon — rendered as a **tile** (fills the chip) |
| `lbs.png` | Square avatar — rendered as a **tile**; at 28px its three lines of type are unreadable, filling the chip makes them legible |
| `ey.svg` | EY's **reversed** lockup — navy recoloured to white for the dark ground, yellow beam untouched |

**Inline from `simple-icons`**, each in its brand hex: Claude, n8n, HubSpot,
Python, PostgreSQL (shown "SQL"), GitHub Actions. Tableau uses the Ionicons
glyph in Tableau orange.

## Still text — 1

| Label | Why |
|---|---|
| **Comviva** | Their logo is a wordmark with no standalone icon. Cropping the orange "o" out of it would not be their mark. |

To fix it, either supply a square Comviva avatar/app icon and add
`file: "comviva.png", tile: true` to that entry in `src/content/logos.ts`, or
ask for the inner ring to become wide pill-shaped chips, which fit wordmarks.

## Tiles vs glyphs

A `tile: true` logo is a square avatar with its own background (Nuvia's
gradient, LBS's navy block). Tiles fill the whole chip; transparent glyphs
sit at ~28px inside it. Getting this wrong is why LBS looked unusable at
first — as a 28px glyph it is a navy smudge, as a 62px tile it reads.

## Colour

Everything renders in **brand colour**. Clay's 3D arch and Nuvia's gradient
can't be flattened to a single colour without destroying them, so the inline
marks match those rather than fighting them.

Two hex values are deliberately not the brand default: Python's own `#3776AB`
and PostgreSQL's `#4169E1` are too dark against `#08080a`, so both use a
lighter blue from their own two-tone marks.

## What works as a source file

- **Square, transparent, icon-only.** Chips are 56–64px with the mark at
  ~28px. A horizontal wordmark is unreadable at that size.
- SVG preferred; PNG at 256px+ is fine.
- If a brand only has a wordmark, leave it as a text chip — or ask for the
  inner ring to become wide pill-shaped chips, which fit wordmarks properly.

## ⚠️ Trap

`simple-icons` has an "Apollo" icon, but it is **Apollo GraphQL** — a
different company from **Apollo.io**. `logos.ts` has a comment marking this.

## Using third-party marks

Showing logos of companies you worked for and tools you used is normal
portfolio practice — it states factual history. Shapes are unmodified; only
EY was recoloured, to the reversed version the brand itself publishes for
dark backgrounds. The `note` field shows your real role and dates on hover,
so nothing implies current employment or endorsement.
