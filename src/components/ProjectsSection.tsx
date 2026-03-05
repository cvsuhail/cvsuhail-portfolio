import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Building2, User, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const personalProjects = [
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
    tags: ["Flutter", "iOS", "Android"],
    url: "#",
    featured: true,
    comingSoon: true,
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
];

const companyProjects = [
  {
    title: "Habilife",
    description: "A comprehensive lifestyle and wellness platform designed for healthy living and habit tracking.",
    tags: ["Web App", "React", "Health"],
    url: "https://habilife.app/",
    featured: true,
  },
  {
    title: "Netor AI",
    description: "AI-powered networking and intelligence platform for smarter business connections.",
    tags: ["AI", "SaaS", "React"],
    url: "https://netor.ai/",
    featured: true,
  },
];

const ComingSoonModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative glass-card gold-border p-8 md:p-12 text-center max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "var(--gold-glow-strong)" }}
      >
        <div className="flex items-center justify-center mb-6">
          <Clock className="w-12 h-12 text-primary animate-pulse" />
        </div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-gradient mb-3">Coming Soon</h3>
        <p className="text-muted-foreground font-body">
          Preview of Nidhi app is on the way. Stay tuned for something awesome!
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 rounded-full text-sm font-heading font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "company">("personal");

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
          duration: 0.7,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [activeTab]);

  const handleProjectClick = (e: React.MouseEvent, project: typeof personalProjects[0]) => {
    if ('comingSoon' in project && project.comingSoon) {
      e.preventDefault();
      setShowComingSoon(true);
    }
  };

  const currentProjects = activeTab === "personal" ? personalProjects : companyProjects;

  return (
    <section id="projects" ref={sectionRef} className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          {activeTab === "personal" ? "Personal" : "Company"}{" "}
          <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-8 max-w-xl">
          {activeTab === "personal"
            ? "Products, platforms & experiences I've designed and engineered."
            : "Professional projects I've contributed to at companies."}
        </p>

        {/* Tabs */}
        <div className="flex gap-3 mb-12">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${
              activeTab === "personal"
                ? "bg-primary text-primary-foreground"
                : "glass-card gold-border-hover text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" />
            Personal
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${
              activeTab === "company"
                ? "bg-primary text-primary-foreground"
                : "glass-card gold-border-hover text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Company
          </button>
        </div>

        {/* Featured */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {currentProjects.filter((p) => p.featured).map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleProjectClick(e, project)}
              className="proj-card project-card p-8 flex flex-col justify-between group relative"
            >
              {'comingSoon' in project && project.comingSoon && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-3 py-1 rounded-full font-heading font-semibold bg-primary/20 text-primary border border-primary/30">
                    Coming Soon
                  </span>
                </div>
              )}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {!('comingSoon' in project && project.comingSoon) && (
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  )}
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
        {currentProjects.filter((p) => !p.featured).length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProjects.filter((p) => !p.featured).map((project) => (
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
        )}
      </div>

      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </section>
  );
};

export default ProjectsSection;
