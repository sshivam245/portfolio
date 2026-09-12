import Link from "next/link";
import Section from "./Section";
import { profile } from "@/content/profile";

/**
 * One paragraph on the homepage, with the full history a click away.
 * The role-by-role track record, tool list, education and publications all
 * live on /about now — a landing page shouldn't have to carry a CV.
 */
export default function AboutTeaser({ index = "03" }: { index?: string }) {
  return (
    <Section id="about" index={index} title="About">
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <p className="max-w-prose text-body lg:col-span-8">
          {profile.about[0]}
        </p>
        <div className="lg:col-span-4 lg:text-right">
          <Link href="/about" className="label label-tap group inline-flex items-center gap-2 text-ink">
            Track record &amp; capabilities
            <span
              aria-hidden
              className="h-px w-12 origin-left scale-x-50 bg-accent transition-transform duration-200 group-hover:scale-x-100"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}
