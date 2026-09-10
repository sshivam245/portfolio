# Figures

Drop real artifacts here — dashboard screenshots, workflow captures, analytics
charts. The site picks them up automatically.

## How it works

Each case study in `src/content/caseStudies.ts` lists the figures it wants:

```ts
figures: [
  { src: "nuvia-funnel.png", caption: "Funnel leverage points." },
]
```

If the file exists here, it renders. If it doesn't, the page shows a dashed
placeholder saying which file it's waiting for — nothing breaks, and you can
ship before you've collected everything.

## Filenames currently expected

| File | Case study | Status |
|---|---|---|
| `aeo-traffic-split.png` | Getting found by AI browsers | needed |
| `descipher-positioning.png` | Launching Descipher OS | needed |
| `nuvia-funnel.png` | Nuvia acquisition engine | needed |
| `job-pipeline-architecture.svg` | Job pipeline | ✅ included |
| `mintnova-home.png` | MintNovaLabs | needed — screenshot mintnovalabs.com |

## Before you add a screenshot

1. **Scrub it.** Client names, real emails, revenue figures, API keys — check
   the whole frame, including browser tabs and sidebars. These go on a public
   site indexed by search engines.
2. **Crop tight** to the thing you're showing. A full desktop screenshot reads
   as lazy; a cropped panel reads as deliberate.
3. **Export at 2× width** of the display size (roughly 1200px wide is plenty)
   and keep it under ~400KB. PNG for UI, SVG for diagrams.
4. If you can't share the real thing, say so — describe it and let me draw a
   diagram instead. A labelled diagram is honest; a mocked-up "screenshot" of a
   tool you didn't capture is not.
