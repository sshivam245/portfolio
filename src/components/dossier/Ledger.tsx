import CountUp from "@/components/motion/CountUp";

/**
 * A row of figures ruled off like a ledger, running the full width.
 *
 * It replaced a bordered panel stood beside the hero text. That panel was a
 * card, which this design does not use, and being taller than the column it
 * sat next to it just moved the empty space from the right of the hero to
 * underneath it. Figures belong across the page, not stacked in a box.
 *
 * Vertical hairlines separate the columns. The width is the point: four
 * numbers edge to edge fill the space that a constrained title leaves.
 */
export default function Ledger({
  items,
  verifiedFirst = false,
}: {
  items: { value: string; label: string }[];
  /**
   * True when a stranger can check the headline outcome without taking this
   * site's word for it — `verified` on the case study, which by its own
   * definition refers to outcomes[0].
   *
   * Every value in here used to be painted accent unconditionally, which is
   * exactly the flattening WorkIndex already carries a comment about fixing:
   * the AI Overview citation rendered at the same weight as a figure read off
   * a private Search Console. Accent means one thing on this site.
   */
  verifiedFirst?: boolean;
}) {
  return (
    <dl className="ledger grid gap-x-8 gap-y-8">
      {items.map((o, i) => (
        /* Two shared rows, so a value that wraps does not drop its own label
           below the others. See the same pattern on the masthead metrics. */
        <div
          key={o.label}
          className="row-span-2 grid min-w-0 grid-rows-subgrid gap-y-2"
        >
          <dd
            className={`${
              o.value.length <= 7 ? "t-metric" : "t-metric-sm"
            } break-words`}
          >
            {/* The highlighter marks the one figure a stranger can check. */}
            {verifiedFirst && i === 0 ? (
              <span className="hl">
                <CountUp value={o.value} />
              </span>
            ) : (
              <CountUp value={o.value} />
            )}
          </dd>
          <dt className="text-base font-semibold text-ink-muted">{o.label}</dt>
        </div>
      ))}
    </dl>
  );
}
