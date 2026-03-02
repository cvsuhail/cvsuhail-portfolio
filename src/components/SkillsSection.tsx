import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = {
  "Frontend": ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion"],
  "Mobile": ["React Native", "Flutter", "Dart", "iOS", "Android"],
  "Backend & BaaS": ["Supabase", "Firebase", "Firestore", "Node.js", "REST APIs"],
  "Tools & Design": ["Git", "Figma", "VS Code", "Vercel", "Play Console", "App Store Connect"],
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".skill-group");
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
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
    <section id="skills" ref={sectionRef} className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          Skills & <span className="text-gradient">Expertise</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-16 max-w-xl">
          A curated toolkit refined over years of building products people love.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-group glass-card gold-border-hover p-8">
              <h3 className="text-xl font-heading font-semibold text-primary mb-6">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
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
