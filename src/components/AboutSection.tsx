const AboutSection = () => {
  const stats = [
    { value: "4+", label: "Years shipping products" },
    { value: "20+", label: "Products & sites live" },
    { value: "6", label: "SaaS platforms built" },
    { value: "3", label: "Platforms: iOS, Android, Web" },
  ];

  return (
    <section id="about" className="section-padding noise-bg relative">
      <div className="max-w-5xl mx-auto max-md:flex max-md:flex-col">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-12 max-md:hidden">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6 font-body max-w-3xl max-md:text-[15px] max-md:space-y-4">
          <p>
            I'm a product engineer with 4+ years of experience building software that solves real business problems. I take ownership from planning to launch and deliver production-ready outcomes.
          </p>
          <p>
            I use <span className="text-foreground font-medium">React.js, Next.js, TypeScript, React Native, Flutter, Node.js, MongoDB and PostgreSQL</span> to build websites, web apps, SaaS products, and mobile apps that are scalable and maintainable.
          </p>
          <p>
            I also leverage <span className="text-foreground font-medium">Claude Code, Cursor, Antigravity and Lovable</span> to speed up delivery, reduce iteration cycles, and maintain quality at scale. If your team needs a developer who can build anything end-to-end, I'm ready.
          </p>
          <p>
            I handle <span className="text-foreground font-medium">deployment and app store publishing</span> too — including Google Play Console and Apple App Store Connect — so your product reaches users without handoff friction.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-md:gap-3 max-md:mt-0 max-md:mb-5 max-md:order-first">
          {stats.map(({ value, label }) => (
            <div key={label} className="glass-card gold-border-hover p-6 rounded-xl max-md:p-4">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-1 max-md:text-2xl">
                {value}
              </div>
              <div className="text-xs text-muted-foreground font-body">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
