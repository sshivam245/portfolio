import Section from "./Section";
import { experience, skills } from "@/content/profile";

export function Experience({ index = "02" }: { index?: string }) {
  return (
    <Section id="track" index={index} title="Track record">
      <div className="divide-y" style={{ borderColor: "var(--rule)" }}>
        {experience.map((job) => (
          <div
            key={`${job.company}-${job.role}`}
            className="grid gap-x-10 gap-y-3 py-7 first:pt-0 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <h3 className="text-h3 font-semibold">{job.role}</h3>
              <p className="mt-1 text-small text-ink-muted">{job.company}</p>
              <p className="label mt-2">
                {job.start} — {job.end}
                {"current" in job && job.current ? (
                  <span className="ml-2 text-accent">CURRENT</span>
                ) : null}
              </p>
            </div>
            <ul className="max-w-prose space-y-2 lg:col-span-8">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3 text-body text-ink-muted">
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
