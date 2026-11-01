import Link from "next/link";
import Section from "./Section";
import { profile, experience } from "@/content/profile";
import { indexLine } from "@/lib/text";

/**
 * One paragraph, set large, and the full history a click away. A landing
 * page should not have to carry a CV.
 */
export default function AboutTeaser() {
  return (
    <Section
      id="about"
      tag="About"
      title="A marketer who ships the system."
    >
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="t-subhead max-w-[34ch] font-semibold">
            {indexLine(profile.about[0])}
          </p>
          {/* The two most recent roles, as the facts under the line. */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {experience.slice(0, 2).map((job) => (
              <li key={job.company} className="stage-pill">
                {job.role}, {job.company}
              </li>
            ))}
            <li className="stage-pill">{profile.location}</li>
          </ul>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Link href="/about" className="btn">
            Track record &amp; capabilities →
          </Link>
        </div>
      </div>
    </Section>
  );
}
