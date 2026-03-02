import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Peedia Online",
    description: "An e-commerce SaaS platform — anyone can build their own e-commerce website, mobile app, and WhatsApp chat commerce.",
    tags: ["SaaS", "E-commerce", "React", "Supabase"],
    url: "https://peedia.online/",
    featured: true,
  },
  {
    title: "AppReady",
    description: "A helper tool for 14-day closed testing for individual Play Console owners. Simplifies the app publishing process.",
    tags: ["Tool", "React", "Play Console"],
    url: "https://apprdy.awwads.in/",
    featured: true,
  },
  {
    title: "Nidhi",
    description: "A Flutter app available on iOS & Android for checking Kerala lottery results with a clean, intuitive interface.",
    tags: ["Flutter", "iOS", "Android", "Mobile"],
    url: "#",
    featured: true,
  },
  {
    title: "Reelman Bespoke",
    description: "Premium landing page with bespoke design and smooth interactions.",
    tags: ["Landing Page", "Design"],
    url: "https://reelman-bespoke.awwads.in/",
  },
  {
    title: "Awwads Studio",
    description: "Agency portfolio showcasing creative digital work.",
    tags: ["Portfolio", "Design"],
    url: "https://www.awwads.in/",
  },
  {
    title: "Chat Flow Builder",
    description: "Visual chatbot flow builder with drag-and-drop interface.",
    tags: ["React", "Tool", "UI"],
    url: "https://chat-flow-builder-nine.vercel.app/",
  },
  {
    title: "BHK Kochi Tour Cabs",
    description: "Tour & cab booking website with modern UI.",
    tags: ["Business", "Landing Page"],
    url: "https://www.bhkochitourcabs.com/",
  },
  {
    title: "Jazeel",
    description: "Elegant web experience with refined aesthetics.",
    tags: ["Landing Page", "Design"],
    url: "https://jazeel.awwads.in/",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".proj-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          Selected <span className="text-gradient">Work</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-16 max-w-xl">
          Products, platforms & experiences I've designed and engineered.
        </p>

        {/* Featured */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {projects.filter((p) => p.featured).map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card project-card p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-body bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.filter((p) => !p.featured).map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card project-card p-6 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full font-body bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
