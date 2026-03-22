import { Experience, SkillCategory, Education, Publication, Metric, NavLink } from "@/types";

export const personalInfo = {
  name: "Shivam Goel",
  title: "Growth & GTM Strategist",
  tagline: "Turning market insights into measurable growth",
  bio: "I help companies find their next wave of growth. From building GTM strategies from scratch at an AI startup to driving international market expansion, I thrive at the intersection of strategy, data, and execution. Whether it's launching a brand from zero or optimizing acquisition funnels — I bring the analytical rigor and creative hustle to make it happen.",
  email: "shivam55.goel@gmail.com",
  phone: "+919910690655",
  linkedin: "https://www.linkedin.com/in/shivam-goel-245ss/",
  resumePath: "/resume/shivam-goel-resume.pdf",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export const metrics: Metric[] = [
  { value: "100+", label: "Qualified Leads Generated" },
  { value: "30%", label: "Engagement Increase" },
  { value: "15%", label: "AI Search Traffic Growth" },
  { value: "3", label: "Markets Expanded Into" },
];

export const experiences: Experience[] = [
  {
    role: "Growth & Strategy Executive",
    company: "Cloudsheer Consulting",
    period: "May 2025 — Present",
    current: true,
    achievements: [
      "Automated end-to-end lead generation workflows, significantly improving outreach efficiency and pipeline scalability",
      "Led LinkedIn growth and brand positioning strategy to increase engagement and inbound business opportunities",
      "Implemented AEO & GEO strategies, increasing traffic from AI-powered browsers and generative search platforms by 15%",
      "Spearheaded the launch of Descipher OS — defining GTM strategy, positioning, messaging, and digital presence from inception",
      "Expanded business into the Middle East market, identifying regional demand and establishing early-stage partnerships",
    ],
  },
  {
    role: "Growth Manager",
    company: "Nuvia AI",
    period: "Oct 2024 — Apr 2025",
    achievements: [
      "Led customer acquisition campaigns, generating 100+ high-quality leads in 6 months through data-driven targeting",
      "Executed multi-channel marketing campaigns resulting in 30% increase in engagement and 25% growth in conversions",
      "Delivered 10+ strategic insights through competitor and market analysis, influencing product positioning and GTM decisions",
      "Conducted research across 3 key regions and identified 5 priority segments, improving campaign performance by 20%",
    ],
  },
  {
    role: "Founding GTM Strategist",
    company: "Nuvia AI",
    period: "Jun 2024 — Sep 2024",
    achievements: [
      "Optimized customer acquisition funnels, identifying 3 key leverage points that improved lead quality by 15%",
      "Conducted competitive analysis across 5 major competitors, informing 2 major strategic decisions",
      "Built 8+ performance dashboards and reports, improving reporting efficiency by 30%",
      "Supported product launch initiatives, marketing budget management, and compliance across operational processes",
    ],
  },
  {
    role: "UX/UI Designer (Intern)",
    company: "Comviva Technology",
    period: "May 2023 — Jul 2023",
    achievements: [
      "Designed intuitive UI/UX solutions for the Digital Business Solution System",
      "Conducted user research, wireframing, and interactive prototyping to improve product usability",
      "Collaborated with cross-functional teams to deliver scalable digital interfaces",
    ],
  },
  {
    role: "Cyber Security Analyst (Intern)",
    company: "EY Technology Solutions",
    period: "Jun 2022 — Jul 2022",
    achievements: [
      "Performed vulnerability assessments and strengthened defensive mechanisms in enterprise systems",
      "Implemented secure coding practices to mitigate cybersecurity risks",
      "Conducted risk assessments and delivered recommendations to improve security posture",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Growth & GTM",
    skills: [
      "Growth Strategy",
      "AEO / GEO",
      "Multi-Channel Acquisition",
      "Funnel Optimization",
      "B2B Sales",
      "Market Expansion",
      "Brand Positioning",
      "Automation",
      "Market Research",
    ],
  },
  {
    name: "Marketing Tools",
    skills: [
      "HubSpot",
      "Clay AI",
      "Apollo AI",
      "Google Ads",
      "Campaign Strategy",
      "Email Marketing",
      "CRM Workflows",
    ],
  },
  {
    name: "Data & Analytics",
    skills: [
      "SQL",
      "Python",
      "Tableau",
      "Power BI",
      "Dashboarding",
      "Performance Tracking",
      "Predictive Insights",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "London Business School",
    degree: "Certificate in Digital Marketing with AI Specialization",
    period: "Oct 2024 — Mar 2025",
    highlights: [
      "AI-powered consumer engagement and personalization strategies",
      "Predictive modeling and automation for lead nurturing",
      "Data-driven social and paid media strategies",
    ],
  },
  {
    institution: "Amity University Noida",
    degree: "B.Sc. in Information Technology | CGPA: 8.73",
    period: "Apr 2021 — Aug 2024",
    highlights: [
      "Awarded Best Technical Innovation for high-impact project",
      "Secured 2nd position in the university for academic excellence",
      "2nd place in competitive university-level technical event",
    ],
  },
];

export const publications: Publication[] = [
  {
    title: "Use Case of Intelligent Manufacturing",
    publisher: "Taylor & Francis",
    description: "Authored Chapter 10 in Intelligent Manufacturing in Industry 4.0",
  },
  {
    title: "Next-Gen Diagnostics: Patent Assessment",
    publisher: "Government of India",
    description: "A Comprehensive Approach to Patent Assessment — Copyright Holder",
  },
  {
    title: "Health Insurance Price Prediction using ML",
    publisher: "IEEE Xplore",
    description: "Prediction of Health Insurance Price using Machine Learning Algorithms",
  },
];
