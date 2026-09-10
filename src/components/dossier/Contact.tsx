import Section from "./Section";
import { profile } from "@/content/profile";
import { asset } from "@/lib/basePath";
import { MailIcon, LinkedInIcon, GitHubIcon, DownloadIcon } from "./Icons";

/**
 * A specific ask, not "Let's Build Something".
 */
export default function Contact({ index = "04" }: { index?: string }) {
  const rows = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "LinkedIn", value: "in/shivam-goel-245ss", href: profile.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", value: "sshivam245", href: profile.github, Icon: GitHubIcon },
    { label: "CV", value: "Download PDF", href: asset(profile.resumePath), Icon: DownloadIcon },
  ];

  return (
    <Section id="contact" index={index} title="Contact">
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="max-w-prose text-body">
            I&apos;m looking for a remote founding-GTM or growth-engineering
            role, somewhere early enough that building the acquisition machine
            is the job rather than maintaining one. If that&apos;s what
            you&apos;re hiring for, email me and I&apos;ll reply the same day.
          </p>
        </div>

        <dl className="lg:col-span-5">
          <div className="rule-t">
            {rows.map((r) => (
              <div
                key={r.label}
                className="rule-b flex items-baseline justify-between gap-4 py-4 sm:py-3"
              >
                <dt className="label flex items-center gap-2">
                  <r.Icon className="text-accent" />
                  {r.label}
                </dt>
                <dd className="text-small">
                  <a
                    href={r.href}
                    className="link label-tap"
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
