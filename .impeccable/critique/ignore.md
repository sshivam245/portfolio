# Critique ignore list

Findings triaged as false positives for this project. Verified in source, not
waved away.

## side-tab — `src/app/globals.css` (`.flow-out::after`)

`border-left: 7px solid var(--rule)` with `border-top`/`border-bottom` of 4px
transparent on a zero-dimension pseudo-element is the CSS-triangle idiom. It
renders the arrowhead that terminates the work-index connector, not a card
accent border. Confirmed by the sibling `::before` (the 1px connector line it
caps), by the hover rules animating `border-left-color` in lockstep with the
connector's `background`, and by both pseudo-elements being hidden below 639px
where the spine they point at is gone.

## tight-leading — `.t-display`, `.t-heading`

Measured at 375px: the only three elements under the 1.3 ratio are display
faces (`.t-display` 0.95 at 52px, `.t-heading` 1.08 at 28px, `.t-subhead` 1.15
at 22px). No body text is below the floor. Tight leading on large display type
is correct typography; the 1.3 floor is a body-copy rule. `.t-subhead` was
raised to 1.25 because at 22px it is the smallest display face and carries
two-line titles. The other two are deliberate.
