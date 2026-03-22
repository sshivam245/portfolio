export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
  current?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
}

export interface Publication {
  title: string;
  publisher: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}
