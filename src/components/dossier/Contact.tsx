import Section from "./Section";
import { profile } from "@/content/profile";
import { asset } from "@/lib/basePath";

/**
 * A specific ask, not "Let's Build Something".
 */
export default function Contact() {
  const rows = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "LinkedIn", value: "in/shivam-goel-245ss", href: profile.linkedin },
    { label: "GitHub", value: "sshivam245", href: profile.github },
    { label: "CV", value: "Download PDF", href: asset(profile.resumePath) },
  ];

  return (
    <Section id="contact" index="07" title="Contact">
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="max-w-prose text-body">
            I&apos;m looking for a remote founding-GTM or growth-engineering
            role — somewhere early enough that building the acquisition machine
            is the job rather than maintaining one. If that&apos;s what
            you&apos;re hiring for, email me and I&apos;ll reply the same day.
          </p>
        </div>

        <dl className="lg:col-span-5">
          <div className="rule-t">
            {rows.map((r) => (
              <div
                key={r.label}
                className="rule-b flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="label">{r.label}</dt>
                <dd className="text-small">
                  <a
                    href={r.href}
                    className="link"
                    {...(r.label === "CV" ? { download: true } : {})}
                    {...(r.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {r.value}
                  </a>
                </dd>
              </div>
            ))}
          </div>
        </dl>
      </div>
    </Section>
  );
}
