const skills = {
  "Frontend": ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion"],
  "Mobile": ["React Native", "Flutter", "Dart", "iOS", "Android"],
  "Backend & Data": ["Node.js", "Express.js", "Supabase", "Firebase", "PostgreSQL", "MongoDB", "REST APIs"],
  "Forward Deployed Engineering": ["Customer Discovery", "Solution Architecture", "Rapid Prototyping", "System Integrations", "LLM & AI Agents", "Workflow Automation", "Stakeholder Demos", "Production Rollout"],
  "AI Development Tools": ["Claude Code", "Cursor", "Antigravity", "Lovable"],
  "Deployment & Tools": ["Play Store Console", "App Store Connect", "Git", "Figma", "VS Code", "Vercel", "AWS", "Docker", "CI/CD", "Nginx", "Fastlane", "Firebase Hosting", "Azure"],
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4 max-md:hidden">
          Skills & <span className="text-gradient">Expertise</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-16 max-w-3xl max-md:text-sm max-md:mb-5">
          This is the stack I use to move from idea to production quickly. I combine strong engineering foundations with AI development tools to build faster without compromising quality.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-md:gap-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="glass-card gold-border-hover p-8 hover:-translate-y-1 transition-all duration-300 max-md:p-4">
              <h3 className="text-xl font-heading font-semibold text-primary mb-6 max-md:text-base max-md:mb-3">{category}</h3>
              <div className="flex flex-wrap gap-3 max-md:gap-2">
                {items.map((skill) => (
                  <span key={skill} className={`skill-pill max-md:text-xs max-md:px-3 max-md:py-1.5 ${skill.includes("Beginner") ? "opacity-70" : ""}`}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
