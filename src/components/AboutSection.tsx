const AboutSection = () => {
  const stats = [
    { value: "3.10+", label: "Years Experience" },
    { value: "15+", label: "Projects Shipped" },
    { value: "5+", label: "SaaS Products" },
    { value: "∞", label: "Pixels Perfected" },
  ];

  return (
    <section id="about" className="section-padding noise-bg relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="reveal text-4xl md:text-6xl font-heading font-bold tracking-tight mb-12">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="reveal text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6 font-body max-w-3xl">
          <p>
            I'm a product-focused developer with 3.10+ years of experience building software that solves real business problems. I take ownership from planning to launch and deliver production-ready outcomes.
          </p>
          <p>
            I use <span className="text-foreground font-medium">React.js, Next.js, React Native, Flutter, Supabase and Firebase</span> to build websites, web apps, SaaS products, and mobile apps that are scalable and maintainable.
          </p>
          <p>
            I also leverage <span className="text-foreground font-medium">Claude Code, Cursor, Antigravity and Lovable</span> to speed up delivery, reduce iteration cycles, and maintain quality at scale. If your team needs a developer who can build anything end-to-end, I'm ready.
          </p>
          <p>
            I handle <span className="text-foreground font-medium">deployment and app store publishing</span> too — including Google Play Console and Apple App Store Connect — so your product reaches users without handoff friction.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card gold-border-hover p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
