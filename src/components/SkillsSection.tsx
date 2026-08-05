const skills = {
  "Frontend": ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion"],
  "Mobile": ["React Native", "Flutter", "Dart", "iOS", "Android"],
  "Backend & BaaS": ["Node.js", "Supabase", "Express.js", "Firebase", "REST APIs"],
  "AI Development Tools": ["Claude Code", "Cursor", "Antigravity", "Lovable"],
  "Deployment & Tools": ["Play Store Console", "App Store Connect", "Git", "Figma", "VS Code", "Vercel", "AWS", "Docker", "CI/CD", "Nginx", "Fastlane", "Firebase Hosting", "Azure"],
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          Skills & <span className="text-gradient">Expertise</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-16 max-w-3xl">
          This is the stack I use to move from idea to production quickly. I combine strong engineering foundations with AI development tools to build faster without compromising quality.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="glass-card gold-border-hover p-8 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-heading font-semibold text-primary mb-6">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span key={skill} className={`skill-pill ${skill.includes("Beginner") ? "opacity-70" : ""}`}>{skill}</span>
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
