import { Briefcase, GraduationCap, Code2, Smartphone, Server, Database, Cloud, Layers } from "lucide-react";

const experiences = [
  {
    role: "Product Engineer — Technology Team",
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

const skillCategories = [
  { icon: Code2, title: "Frontend", skills: "React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, GSAP" },
  { icon: Smartphone, title: "Mobile", skills: "Flutter, React Native, cross-platform delivery, push notifications, offline storage, HealthKit" },
  { icon: Server, title: "Backend", skills: "Node.js, Express.js, REST API design, authentication, RBAC, microservices" },
  { icon: Database, title: "Databases", skills: "MongoDB, PostgreSQL, Firebase, Redis, SQLite, data modeling" },
  { icon: Cloud, title: "DevOps & Cloud", skills: "Docker, GitHub Actions, Azure, Vercel, Linux, CI/CD, deployment automation, monitoring" },
  { icon: Layers, title: "Architecture", skills: "System design, multi-tenant SaaS, scalability, performance optimization, cloud-native design" },
];

const ResumeSection = () => {
  return (
    <section id="resume" className="section-padding noise-bg relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          <span className="text-gradient">Resume</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-16 max-w-xl">
          A structured overview of my professional journey.
        </p>

        {/* Experience */}
        <div className="glass-card gold-border-hover p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-bold text-foreground">Experience</h3>
          </div>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.company} className="relative pl-6 border-l-2 border-primary/30">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
                <h4 className="text-lg font-heading font-semibold text-foreground">{exp.role}</h4>
                <p className="text-primary font-heading font-medium text-sm mt-1">{exp.company}</p>
                <p className="text-muted-foreground font-body text-sm">{exp.location}</p>
                <p className="text-muted-foreground font-body text-xs mt-1">{exp.duration}</p>
                <p className="text-muted-foreground/80 font-body text-sm mt-2 leading-relaxed">{exp.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {skillCategories.map(({ icon: Icon, title, skills }) => (
            <div key={title} className="glass-card gold-border-hover p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-primary" />
                <h4 className="font-heading font-semibold text-foreground">{title}</h4>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{skills}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="glass-card gold-border-hover p-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-bold text-foreground">Education</h3>
          </div>
          <div className="pl-6 border-l-2 border-primary/30 relative">
            <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
            <h4 className="text-lg font-heading font-semibold text-foreground">Bachelor of Computer Application (BCA)</h4>
            <p className="text-primary font-heading font-medium text-sm mt-1">Malabar College of Advanced Studies</p>
            <p className="text-muted-foreground font-body text-sm">Affiliated to Calicut University</p>
            <p className="text-muted-foreground font-body text-xs mt-1">2019 – 2022</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
