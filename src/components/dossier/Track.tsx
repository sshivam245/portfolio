import Section from "./Section";
import { experience, skills } from "@/content/profile";

export function Experience({ index = "02" }: { index?: string }) {
  return (
    <Section id="track" index={index} title="Track record">
      {/*
        A career drawn as a timeline rather than ruled off as a table. Same
        spine-and-node language as the case-study build steps and the work
        index, with the start year in the node so the sequence is datable at
        a glance.

        The bullets stay. This is the page a hiring manager reads, and they
        are the evidence on it: cutting them to save words would be trading
        the one thing the page is for.
      */}
      <ol className="build-flow sm:pl-14">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.role}`}
            className="relative py-7 first:pt-0"
          >
            <span aria-hidden className="build-node tnum hidden sm:grid">
              {job.start.slice(-2)}
            </span>
            <div className="grid gap-x-10 gap-y-3 lg:grid-cols-12">
              <div className="lg:col-span-4">
                {/* text-h3 was never a defined size, so this had been
                    rendering at body size with a weight. Says what it does
                    now. */}
                <h3 className="text-body font-semibold">{job.role}</h3>
                <p className="mt-1 text-small text-ink-muted">{job.company}</p>
                <p className="label mt-2">
                  {job.start}–{job.end}
                  {"current" in job && job.current ? (
                    <span className="ms-2 text-accent">CURRENT</span>
                  ) : null}
                </p>
              </div>
              <ul className="max-w-prose space-y-2 lg:col-span-8">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-small text-ink-muted">
                    <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Capabilities({ index = "03" }: { index?: string }) {
  return (
    <Section id="capabilities" index={index} title="Capabilities">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
        {skills.map((group) => (
          <div key={group.group}>
            <h3 className="label rule-b pb-2 text-ink">{group.group}</h3>
            <ul className="mt-3 space-y-1.5">
              {group.items.map((s) => (
                <li key={s} className="text-small text-ink-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
