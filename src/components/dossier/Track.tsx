import Section from "./Section";
import { experience, skills } from "@/content/profile";

export function Experience() {
  return (
    <Section id="track" tag="Track record" title="Where the engines got built." tone="blue">
      <ol className="grid gap-4">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.role}`}
            /* px padding: rem padding doubled with 200% text and pushed the
               panel past a phone screen. */
            className="grid min-w-0 gap-x-10 gap-y-4 rounded-[26px] border-2 p-[24px] lg:grid-cols-12 lg:p-[32px]"
            style={{ borderColor: "var(--rule)" }}
          >
            <div className="lg:col-span-4">
              <p className="label">
                {job.start} to {job.end}
                {"current" in job && job.current ? (
                  <span className="hl ms-2">Now</span>
                ) : null}
              </p>
              <h3 className="t-subhead mt-3">{job.role}</h3>
              <p className="mt-1 text-base font-semibold text-ink-muted">{job.company}</p>
            </div>
            <ul className="max-w-prose space-y-3 lg:col-span-8">
              {job.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-base leading-relaxed">
                  <span aria-hidden className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-ink-a" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Capabilities() {
  return (
    <Section id="capabilities" tag="Capabilities" title="What's in the toolbox.">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
        {skills.map((group) => (
          <div key={group.group}>
            <h3 className="stage-tag">{group.group}</h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((s) => (
                <li key={s} className="text-base font-medium">
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
