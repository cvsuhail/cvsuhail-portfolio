import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Twitter, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal-contact");
    if (!els) return;

    els.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const whatsappUrl = `https://wa.me/919562770397?text=${encodeURIComponent("Hi CvSuhail, I found you through your portfolio and would love to connect!")}`;

  return (
    <section id="contact" ref={sectionRef} className="section-padding noise-bg relative min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="reveal-contact text-4xl md:text-7xl font-heading font-bold tracking-tight mb-6">
          Ready to Build Your <span className="text-gradient">Website, App or Software?</span>
        </h2>

        <p className="reveal-contact text-lg text-muted-foreground font-body mb-12 max-w-lg mx-auto">
          Need someone to build a website, mobile app or software solution? Share your idea and I'll reply with a clear plan and next steps.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal-contact inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-heading font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105"
          style={{ boxShadow: "var(--gold-glow-strong)" }}
        >
          <MessageCircle className="w-5 h-5" />
          Get In Touch
        </a>

        {/* Social links */}
        <div className="reveal-contact flex justify-center gap-6 mt-12">
          {[
            { icon: Github, label: "GitHub", url: "https://github.com/cvsuhail" },
            { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/suhailcv/" },
            { icon: Twitter, label: "Twitter", url: "https://twitter.com/cvsuhail" },
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
        <div className="reveal-contact mt-20 pt-8 border-t border-border/60">
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
