import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const portfolios = [
  {
    name: "Ramees",
    description: "A bold, modern portfolio site crafted for Ramees with smooth micro-interactions.",
    url: "https://ramees.awwads.in/",
  },
  {
    name: "Nimin",
    description: "Minimal, high-contrast portfolio experience designed for Nimin.",
    url: "https://nimin.awwads.in/",
  },
];

const PortfoliosSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".portfolio-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section id="portfolios" ref={sectionRef} className="section-padding noise-bg relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          Friends&apos; <span className="text-gradient">Portfolios</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-10 max-w-xl">
          A few portfolio websites I&apos;ve crafted for my friends, focused on personality,
          clarity, and smooth interactions.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card project-card p-6 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {site.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {site.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfoliosSection;

