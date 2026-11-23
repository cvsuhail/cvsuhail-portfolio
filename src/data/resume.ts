// Resume data shared by the Resume section and the downloadable CV
// (scripts/build-cv.ts). Keep it plain data: no JSX or path aliases, so the
// CV script can import it with Node directly. After editing this file or
// projects.ts, run `npm run cv` to regenerate public/Muhammed-Suhail-CV.pdf.

export const CV_PDF_PATH = "/Muhammed-Suhail-CV.pdf";

export const profile = {
  name: "Muhammed Suhail CV",
  title: "Product Engineer | Full-Stack & Mobile Developer",
  location: "Kerala, India · Open to remote worldwide (UTC+05:30)",
  email: "cvsuhail.ckd@gmail.com",
  phone: "+91 95627 70397",
  website: "https://cvsuhail.online",
  linkedin: "https://linkedin.com/in/suhailcv",
  github: "https://github.com/cvsuhail",
  summary:
    "Product engineer with 4+ years of experience building websites, web apps, cross-platform mobile apps and multi-tenant SaaS platforms end to end, from planning through deployment and App Store / Play Store publishing. Works directly with customers and stakeholders as a forward deployed engineer to turn real workflows into shipped software, and uses AI development tools to deliver faster without lowering quality.",
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  duration: string;
  note: string;
};

export const experiences: Experience[] = [
  {
    role: "Solutions Engineer — Technology Team",
    company: "Sunni Students Federation (SSF Kerala)",
    location: "Kerala, India",
    duration: "Jan 2025 – Present",
    note: "Building the digital platforms behind one of Kerala's largest student organizations.",
  },
  {
    role: "Cofounder & Product Engineer",
    company: "Peedia.online",
    location: "Kerala, India",
    duration: "2025 – Present",
    note: "Product strategy, architecture and infrastructure for a multi-tenant ecommerce SaaS.",
  },
  {
    role: "Product Engineer",
    company: "UnitVilla LLC",
    location: "Remote",
    duration: "Dec 2024 – Present",
    note: "SaaS products for international customers across web and mobile.",
  },
  {
    role: "Software Engineer",
    company: "Keibot Learning Solutions Pvt Ltd",
    location: "Kerala, India",
    duration: "Apr 2022 – Nov 2024",
    note: "Enterprise web and mobile applications, REST APIs and production releases on iOS and Android.",
  },
];

export type SkillCategory = { title: string; skills: string };

export const skillCategories: SkillCategory[] = [
  { title: "Frontend", skills: "React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, GSAP" },
  { title: "Mobile", skills: "Flutter, React Native, cross-platform delivery, push notifications, offline storage, HealthKit" },
  { title: "Backend", skills: "Node.js, Express.js, REST API design, authentication, RBAC, microservices" },
  { title: "Databases", skills: "MongoDB, PostgreSQL, Firebase, Supabase, Redis, SQLite, data modeling" },
  { title: "DevOps & Cloud", skills: "Docker, GitHub Actions, Azure, AWS, Vercel, Linux, Nginx, CI/CD, Fastlane, deployment automation, monitoring" },
  { title: "Architecture", skills: "System design, multi-tenant SaaS, scalability, performance optimization, cloud-native design" },
  { title: "Forward Deployed Engineering", skills: "Customer discovery, solution architecture, rapid prototyping, system integrations, LLM & AI agents, workflow automation, stakeholder demos, production rollout" },
  { title: "AI Development Tools", skills: "Claude Code, Cursor, Antigravity, Lovable" },
];

export const education = {
  degree: "Bachelor of Computer Application (BCA)",
  school: "Malabar College of Advanced Studies",
  affiliation: "Affiliated to Calicut University",
  duration: "2019 – 2022",
};
