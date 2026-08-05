import { CheckCircle2, Linkedin, MapPin, MessageSquare, Globe, ArrowDown } from "lucide-react";
import RippleDistortion from "./RippleDistortion";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between noise-bg overflow-hidden pt-20 md:pt-24 pb-12"
    >
      {/* Background Orange & Yellow Light Leak Glow Accents */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] sm:w-[900px] h-[550px] rounded-full opacity-30 blur-[130px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(32 95% 55% / 0.55), hsl(43 90% 50% / 0.35), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(20 90% 50% / 0.4), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(45 95% 55% / 0.4), transparent 70%)",
        }}
      />

      {/* MAIN HERO CONTENT (ATTRACTIVELY CENTERED & BALANCED) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center text-center pt-2">
        {/* Main Hero DP Avatar with RippleDistortion effect */}
        <div id="hero-dp" className="relative inline-block group mb-6">
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full border-4 border-background overflow-hidden shadow-2xl bg-background relative z-10 transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.7), var(--gold-glow-strong)" }}
          >
            <RippleDistortion
              src="/dp.jpeg"
              brushSize={90}
              strength={0.16}
              swirl={0.8}
              rings={3}
              tint="#eab308"
              tintAmount={0.15}
              grayscale={false}
              trigger="both"
              className="w-full h-full"
            />
          </div>
          {/* Verified gold checkmark badge */}
          <div
            className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 z-20 flex h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary border-2 sm:border-3 border-background items-center justify-center shadow-xl transform transition-transform group-hover:scale-110"
            title="Verified Engineer"
          >
            <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-foreground stroke-[3]" />
          </div>
        </div>

        {/* Center Aligned Profile Details & Metadata */}
        <div className="space-y-5 w-full flex flex-col items-center">
          {/* Clean Name Header with visible (CvSuhail) gradient */}
          <h1 className="hero-name text-2xl sm:text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground leading-snug px-2">
            Muhammed Suhail CV <span className="text-gradient font-bold block sm:inline mt-1 sm:mt-0">(CvSuhail)</span>
          </h1>

          {/* Headline */}
          <p className="text-base sm:text-xl md:text-2xl font-heading font-semibold text-foreground/90 max-w-3xl leading-snug px-2">
            Product Engineer | Full-Stack & Mobile Developer | React.js, Next.js, Flutter, React Native & SaaS Architecture
          </p>

          {/* Location & Website Signal Bar */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm text-muted-foreground font-body glass-card px-4 sm:px-5 py-2 rounded-full border border-border/50 max-w-full">
            <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Kerala, India<span className="hidden sm:inline"> · Remote Worldwide (UTC+05:30)</span></span>
            </span>
            <span className="hidden sm:inline text-muted-foreground/40">•</span>
            <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
              <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>cvsuhail.online</span>
            </span>
          </div>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-base text-muted-foreground font-body max-w-2xl leading-relaxed px-2">
            I help companies ship fast, reliable products with clean UX. From marketing websites and multi-tenant SaaS platforms to iOS/Android mobile apps with App Store publishing.
          </p>

          {/* Quick Action Buttons (3 Buttons in the Same Row) */}
          <div className="w-full flex flex-row items-center justify-center flex-wrap gap-2.5 sm:gap-3 pt-2">
            <a
              href={`https://wa.me/919562770397?text=${encodeURIComponent("Hi CvSuhail, I saw your portfolio and would like to discuss hiring you for a developer role/project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full text-xs sm:text-sm font-heading font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-xl hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Discuss Hiring on WhatsApp</span>
            </a>
            <a
              href="https://linkedin.com/in/suhailcv/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full text-xs sm:text-sm font-heading font-semibold glass-card gold-border-hover text-foreground hover:text-primary transition-all shadow-lg hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <span>Connect on LinkedIn</span>
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full text-xs sm:text-sm font-heading font-semibold glass-card gold-border-hover text-foreground shadow-md hover:scale-105 transition-all"
            >
              <span>View Projects</span>
            </a>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-3xl">
            {["React.js", "Next.js", "React Native", "Flutter", "Node.js", "TypeScript", "Multi-Tenant SaaS", "MongoDB", "PostgreSQL", "Claude Code"].map((tech) => (
              <span key={tech} className="skill-pill text-xs px-3 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator at bottom */}
      <div className="flex flex-col items-center gap-1 pt-8 md:pt-12 pb-6">
        <a href="#about" aria-label="Scroll to About" className="flex flex-col items-center gap-1.5 group">
          <span className="text-[10px] text-muted-foreground font-body tracking-widest uppercase group-hover:text-primary transition-colors">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 text-primary animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
