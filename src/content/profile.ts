/**
 * Identity, contact, and the non-case-study content.
 * Edit this file to update the site — no component changes needed.
 */

export const profile = {
  name: "Shivam Goel",
  role: "Growth & GTM",
  // Kept deliberately concrete. No "passionate", no "results-driven".
  statement: "I build acquisition engines — and the automation underneath them.",
  location: "Remote",
  yearsExperience: 2,

  email: "shivam55.goel@gmail.com",
  phone: "+91 99106 90655",
  // NOTE: resume.json and the old site disagreed on this URL. Verify which is live.
  linkedin: "https://www.linkedin.com/in/shivam-goel-245ss/",
  github: "https://github.com/sshivam245",
  resumePath: "/resume/shivam-goel-resume.pdf",

  /** Short human note. First person, plain language. */
  about: [
    "I work at the seam between growth and engineering. Most of what I do ends up as a system someone else can run — a lead pipeline that scores and routes on its own, a dashboard that answers the question before it gets asked, a launch checklist that survives the person who wrote it.",
    "I started in IT and cybersecurity, spent a summer as a UX designer, and ended up in GTM. That path is why I reach for SQL and automation before I reach for a deck. Right now I'm looking for a founding-GTM or growth-engineering role at a company early enough that building the machine is the job.",
  ],
} as const;

/** Headline metrics. Shown as an aligned table, never as cards. */
export const headlineMetrics = [
  { value: "100+", unit: "", label: "Qualified leads", note: "in 6 months, Nuvia AI" },
  { value: "15", unit: "%", label: "Generative-search lift", note: "AEO/GEO, Cloudsheer" },
  { value: "25", unit: "%", label: "Conversion lift", note: "multi-channel campaigns" },
  { value: "0→1", unit: "", label: "Brand launched", note: "Descipher OS, from scratch" },
] as const;

export const experience = [
  {
    company: "Cloudsheer Consulting",
    role: "Growth & Strategy Executive",
    start: "May 2025",
    end: "Present",
    current: true,
    points: [
      "Automated end-to-end lead generation, improving outreach efficiency and pipeline scalability.",
      "Led LinkedIn growth and brand positioning for inbound opportunities.",
      "Implemented AEO and GEO strategies, growing traffic from AI browsers and generative search by 15%.",
      "Launched Descipher OS — GTM strategy, positioning, messaging and digital presence from inception.",
      "Opened the Middle East market: demand identification, entry strategy, early partnerships.",
    ],
  },
  {
    company: "Nuvia AI",
    role: "Growth Manager",
    start: "Oct 2024",
    end: "Apr 2025",
    points: [
      "Ran acquisition campaigns generating 100+ qualified leads in 6 months.",
      "Multi-channel campaigns: +30% engagement, +25% conversion.",
      "Delivered 10+ strategic insights from competitor and market analysis.",
      "Research across 3 regions and 5 priority segments, +20% campaign performance.",
    ],
  },
  {
    company: "Nuvia AI",
    role: "Founding GTM Strategist",
    start: "Jun 2024",
    end: "Sep 2024",
    points: [
      "Found 3 leverage points in the acquisition funnel; +15% lead quality.",
      "Competitive analysis across 5 competitors informing 2 major strategic decisions.",
      "Built 8+ performance dashboards, +30% reporting efficiency.",
      "Supported product launch, marketing budget, and compliance.",
    ],
  },
  {
    company: "Comviva Technology",
    role: "UX/UI Designer — Intern",
    start: "May 2023",
    end: "Jul 2023",
    points: [
      "Designed UI/UX for the Digital Business Solution System.",
      "User research, wireframing, and interactive prototyping.",
    ],
  },
  {
    company: "EY Technology Solutions",
    role: "Cyber Security Analyst — Intern",
    start: "Jun 2022",
    end: "Jul 2022",
    points: [
      "Vulnerability assessments and defensive hardening.",
      "Secure coding practices for remote work environments.",
    ],
  },
] as const;

export const skills = [
  {
    group: "Growth & GTM",
    items: ["Growth Strategy", "AEO", "GEO", "Multi-Channel Acquisition", "Funnel Optimization", "B2B Sales", "Market Expansion", "Brand Positioning", "Market Research"],
  },
  {
    group: "Systems & Automation",
    items: ["Python", "SQL", "HubSpot", "Clay AI", "Apollo AI", "CRM Workflows", "Email Automation", "GitHub Actions"],
  },
  {
    group: "Analytics",
    items: ["Tableau", "Power BI", "Dashboarding", "Performance Tracking", "Predictive Insights", "Google Ads"],
  },
] as const;

export const education = [
  {
    institution: "London Business School",
    credential: "Certificate in Digital Marketing, AI Specialization",
    period: "Oct 2024 — Mar 2025",
    honors: [],
  },
  {
    institution: "Amity University, Noida",
    credential: "B.Sc. Information Technology — GPA 8.73",
    period: "Apr 2021 — Aug 2024",
    honors: ["Best Technical Innovation", "2nd in university, academic & extracurricular"],
  },
] as const;

export const publications = [
  {
    title: "Use Case of Intelligent Manufacturing",
    venue: "Intelligent Manufacturing in Industry 4.0, Ch. 10 — Taylor & Francis",
  },
  {
    title: "Next-Gen Diagnostics: A Comprehensive Approach to Patent Assessment",
    venue: "Government of India — Copyright Holder",
  },
  {
    title: "Prediction of Health Insurance Price using Machine Learning Algorithms",
    venue: "IEEE Xplore",
  },
] as const;

/** Beyond Work — kept factual, no gradients, no emoji-as-icon. */
export const beyond = [
  {
    label: "Sport",
    title: "National table tennis player",
    detail:
      "Represented India at the Youth Cup. Competitive sport is where I learned to practise a thing until it stops being interesting, which turns out to be most of growth work too.",
  },
  {
    label: "Leadership",
    title: "HPAIR delegate, 2026",
    detail:
      "Selected for the Harvard Project for Asian & International Relations — a conference on business, policy and innovation across Asia.",
  },
] as const;
