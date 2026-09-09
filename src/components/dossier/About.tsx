import Section from "./Section";
import { profile, education, publications, beyond } from "@/content/profile";

export function About() {
  return (
    <Section id="about" index="04" title="About">
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {profile.about.map((para) => (
            <p key={para} className="mb-4 max-w-prose text-body last:mb-0">
              {para}
            </p>
          ))}
        </div>

        <div className="lg:col-span-5">
          <h3 className="label rule-b pb-2 text-ink">Beyond work</h3>
          <div className="divide-y" style={{ borderColor: "var(--rule)" }}>
            {beyond.map((b) => (
              <div key={b.title} className="py-4">
                <p className="label mb-1">{b.label}</p>
                <h4 className="text-h3 font-semibold">{b.title}</h4>
                <p className="mt-2 text-small text-ink-muted">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Credentials() {
  return (
    <Section id="credentials" index="05" title="Education & publications">
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h3 className="label rule-b pb-2 text-ink">Education</h3>
          <div className="divide-y" style={{ borderColor: "var(--rule)" }}>
            {education.map((e) => (
              <div key={e.institution} className="py-4">
                <h4 className="text-h3 font-semibold">{e.institution}</h4>
                <p className="mt-1 text-small text-ink-muted">{e.credential}</p>
                <p className="label mt-2">{e.period}</p>
                {e.honors.length ? (
                  <ul className="mt-2 space-y-1">
                    {e.honors.map((h) => (
                      <li key={h} className="text-small text-ink-muted">
                        <span className="mr-2 text-accent">·</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <h3 className="label rule-b pb-2 text-ink">Publications</h3>
          <ol className="divide-y" style={{ borderColor: "var(--rule)" }}>
            {publications.map((p, i) => (
              <li key={p.title} className="flex gap-4 py-4">
                <span className="label tnum shrink-0 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-body font-medium">{p.title}</h4>
                  <p className="mt-1 text-small text-ink-muted">{p.venue}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
