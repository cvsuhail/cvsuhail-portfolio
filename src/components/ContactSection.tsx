import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import ParticleText from "./ParticleText";

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/919562770397?text=${encodeURIComponent("Hi CvSuhail, I reviewed your portfolio and would like to discuss a project or developer hiring opportunity.")}`;

  return (
    <section id="contact" className="section-padding noise-bg relative min-h-screen flex items-center pb-28 md:pb-16">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="text-3xl md:text-6xl font-heading font-bold tracking-tight mb-2">
          Need a Developer Who Can
        </h2>

        {/* Interactive Particle Text for "Build Anything?" */}
        <div className="w-full h-20 sm:h-24 md:h-32 relative mb-6">
          <ParticleText
            text="Build Anything?"
            fontSize="clamp(2rem, 6vw, 4.2rem)"
            fontWeight={700}
            fontFamily="'Space Grotesk', sans-serif"
            color="#eab308"
            highlightColor="#ffffff"
            density={3.5}
            scatter={120}
            pointerRepel={35}
            idleDrift={0.6}
            trigger="hover"
          />
        </div>

        <p className="text-lg text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
          Hiring for a product role or planning a new build? Share your goals, timeline, and scope. I'll respond with a practical execution plan and clear next steps.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-heading font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105"
          style={{ boxShadow: "var(--gold-glow-strong)" }}
        >
          <MessageCircle className="w-5 h-5" />
          Start Hiring Conversation
        </a>

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-12">
          {[
            { icon: Github, label: "GitHub", url: "https://github.com/cvsuhail" },
            { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/suhailcv/" },
            { icon: Mail, label: "Email", url: "mailto:cvsuhail.ckd@gmail.com" },
          ].map(({ icon: Icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center gold-border-hover text-muted-foreground hover:text-primary transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border/60">
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground font-body">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/70 bg-background/80 shadow-sm">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground/80">
                Available for exciting projects
              </span>
            </div>
            <div className="text-center space-y-1">
              <p>
                © 2026 <span className="text-foreground font-medium">Muhammed Suhail CV</span>
              </p>
              <p className="text-xs text-muted-foreground/80">
                Crafted with passion & precision from Kerala, India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
