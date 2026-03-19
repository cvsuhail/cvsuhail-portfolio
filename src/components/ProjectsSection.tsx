import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "PeediaOnline",
    summary: "A commerce platform for small and mid businesses that want to sell faster without expensive custom development.",
    problem:
      "Many local businesses lose sales because building a website, app, and WhatsApp ordering flow usually needs multiple tools, high budgets, and technical teams.",
    fix:
      "We unified storefront setup, mobile experience, and chat-commerce into one SaaS workflow so merchants can launch quickly and manage sales from a single place.",
    tags: ["SaaS", "E-commerce", "React", "Supabase"],
    url: "https://peedia.online/",
    featured: true,
  },
  {
    title: "AppReady",
    summary: "A launch-assist product for indie developers trying to pass Google Play's closed testing requirement.",
    problem:
      "Individual developers often get stuck in the 14-day closed testing step, delaying releases and reducing momentum before the product reaches real users.",
    fix:
      "We built a guided system that helps founders prepare testing, track requirements, and move confidently toward production publishing with less confusion.",
    tags: ["Tool", "React", "Play Console"],
    url: "https://apprdy.awwads.in/",
    featured: true,
  },
  {
    title: "Habilife",
    summary: "A wellness platform focused on daily behavior change and healthier routines.",
    problem:
      "People struggle to maintain healthy habits because progress is hard to track, motivation drops quickly, and most tools feel overwhelming.",
    fix:
      "We designed a structured habit and lifestyle flow with simple tracking, clearer daily actions, and a user-friendly interface that encourages consistency.",
    tags: ["Web App", "React", "Health"],
    url: "https://habilife.app/",
    featured: true,
  },
  {
    title: "Netor",
    summary: "An AI-powered networking workspace for finding relevant business opportunities faster.",
    problem:
      "Professionals waste time on low-value networking because discovering the right people, context, and opportunities is usually noisy and manual.",
    fix:
      "We built intelligent discovery and insight-driven workflows that reduce guesswork, helping users focus on high-intent connections and better collaboration.",
    tags: ["AI", "SaaS", "React"],
    url: "https://netor.ai/",
    featured: true,
  },
  {
    title: "OosiApp",
    summary: "A ride-sharing platform for both carpooling and bike pooling in everyday commuting.",
    problem:
      "Daily travel costs, traffic, and last-mile transport gaps make commuting stressful, especially for students and working professionals.",
    fix:
      "We created a location-aware ride-sharing experience where users can post or join car and bike rides, reducing costs and improving travel convenience.",
    tags: ["Carpooling", "Bike Sharing", "Web App"],
    url: "https://oosi-app.vercel.app/",
    featured: true,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-10 max-w-3xl">
          Every product here is built to solve a real-world problem. I focus on understanding pain points first,
          then designing and engineering clear, scalable solutions with clean UX and business impact.
        </p>

        {/* Featured */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {projects.filter((p) => p.featured).map((project, index) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card project-card p-0 flex flex-col justify-between group relative isolate"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
              <div className="absolute -top-20 -right-16 w-44 h-44 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-7 md:p-8 space-y-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-heading text-primary/90 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] font-heading text-muted-foreground group-hover:text-primary transition-colors">
                    View Live
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-border/80 bg-secondary/50 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {project.summary}
                </p>

                <div className="rounded-xl border border-border/60 bg-secondary/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] font-heading text-primary mb-2">Real-World Problem</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{project.problem}</p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] font-heading text-primary mb-2">How We Fix It</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{project.fix}</p>
                </div>
              </div>

              <div className="px-7 md:px-8 pb-7 md:pb-8 pt-2 border-t border-border/50 bg-gradient-to-b from-transparent to-secondary/20">
                <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full font-body bg-secondary/80 border border-border/70 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
