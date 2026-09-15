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
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <dl className="ledger grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
      {items.map((o) => (
        /* Two shared rows, so a value that wraps does not drop its own label
           below the others. See the same pattern on the masthead metrics. */
        <div
          key={o.label}
          className="row-span-2 grid min-w-0 grid-rows-subgrid gap-y-2"
        >
          <dd
            className={`${
              o.value.length <= 7 ? "t-metric" : "t-metric-sm"
            } break-words text-accent`}
          >
            {/* Words pass through untouched; only numbers count up. */}
            <CountUp value={o.value} />
          </dd>
          <dt className="text-small text-ink-muted">{o.label}</dt>
        </div>
      ))}
    </dl>
  );
}
