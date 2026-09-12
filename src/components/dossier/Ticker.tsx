import { skills } from "@/content/profile";

/**
 * A continuously scrolling strip of the actual toolset.
 *
 * This is the page's one piece of ambient motion. It earns its place because
 * it is real content — the tools from the Capabilities section — rather than
 * decoration, and it pauses on hover so it can be read. Two identical tracks
 * translated -50% give a seamless loop.
 */
export default function Ticker() {
  const items = skills.flatMap((g) => g.items);

  const Track = ({ "aria-hidden": hidden }: { "aria-hidden"?: boolean }) => (
    <ul
      aria-hidden={hidden}
      className="ticker-track flex shrink-0 items-center gap-8 pe-8"
    >
      {items.map((item) => (
        <li key={item} className="label flex shrink-0 items-center gap-8">
          <span>{item}</span>
          <span aria-hidden className="text-accent">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker rule-t rule-b overflow-hidden py-3">
      <div className="flex w-max">
        <Track />
        <Track aria-hidden />
      </div>
    </div>
  );
}
