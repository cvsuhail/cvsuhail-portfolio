import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Twitter, MessageCircle, FileText } from "lucide-react";

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
          duration: 1,
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
          Let's Build Something <span className="text-gradient">Amazing</span>
        </h2>

        <p className="reveal-contact text-lg text-muted-foreground font-body mb-12 max-w-lg mx-auto">
          Have a project in mind? I'd love to hear about it. Let's create something extraordinary together.
        </p>

        <div className="reveal-contact flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-heading font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105"
            style={{ boxShadow: "var(--gold-glow-strong)" }}
          >
            <MessageCircle className="w-5 h-5" />
            Get In Touch
          </a>

          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-heading font-semibold glass-card gold-border-hover text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
          >
            <FileText className="w-5 h-5" />
            View Resume
          </a>
        </div>

        {/* Social links */}
        <div className="reveal-contact flex justify-center gap-6 mt-12">
          {[
            { icon: Github, label: "GitHub", url: "https://github.com/cvsuhail" },
            { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/cvsuhail" },
            { icon: Twitter, label: "Twitter", url: "https://twitter.com/cvsuhail" },
            { icon: Mail, label: "Email", url: "mailto:hello@cvsuhail.com" },
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
        <div className="reveal-contact mt-20 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground font-body">
            © 2026 CvSuhail. Crafted with passion & precision.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
