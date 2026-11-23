import { useState, type ReactNode } from "react";
import { ArrowUpRight, Lock, Sparkles, Layers, Globe, Code2 } from "lucide-react";
import { allProjects, type Status } from "@/data/projects";

const statusMeta: Record<Status, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-foreground" },
  building: { label: "In Active Build", dot: "bg-muted-foreground" },
  internal: { label: "Internal Platform", dot: "bg-muted-foreground/40" },
};

const CardShell = ({
  url,
  className,
  children,
}: {
  url?: string;
  className: string;
  children: ReactNode;
}) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "saas" | "website" | "hobby">("all");

  const filteredProjects =
    activeTab === "all" ? allProjects : allProjects.filter((p) => p.category === activeTab);

  const saasProjects = allProjects.filter((p) => p.category === "saas");
  const websiteProjects = allProjects.filter((p) => p.category === "website");
  const hobbyProjects = allProjects.filter((p) => p.category === "hobby");

  return (
    <section id="projects" className="section-padding noise-bg relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 max-md:mb-1">
          <div className="max-md:hidden">
            <p className="mb-2 font-heading text-xs uppercase tracking-[0.24em] text-muted-foreground">
              2022 — 2026 Portfolio
            </p>
            <h2 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">
              Selected <span className="text-gradient">Work</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-sm md:text-base text-muted-foreground leading-relaxed">
            SaaS platforms, cross-platform mobile apps, cultural event hubs, static web experiences, and creative experiments built end-to-end.
          </p>
        </div>

        {/* Category tabs. On phones this is a sticky top tab bar: inactive tabs show
            icon + count, the active tab shows its label. Desktop keeps full pills. */}
        <div
          role="tablist"
          aria-label="Project categories"
          className="sticky top-[61px] z-30 -mx-4 px-4 py-2 mb-8 max-md:mb-4 flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-background/95 backdrop-blur-xl border-b border-border md:static md:mx-0 md:px-0 md:py-0 md:pb-2 md:mb-10 md:gap-2 md:overflow-visible md:flex-wrap md:bg-transparent md:backdrop-blur-none md:border-border/40"
        >
          {[
            { id: "all", label: "All Projects", icon: Layers, count: allProjects.length },
            { id: "saas", label: "SaaS & Mobile Apps", icon: Sparkles, count: saasProjects.length },
            { id: "website", label: "Client Websites", icon: Globe, count: websiteProjects.length },
            { id: "hobby", label: "Hobby & Experiments", icon: Code2, count: hobbyProjects.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`${tab.label} (${tab.count})`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex h-9 items-center justify-center gap-1 px-2 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-all md:h-auto md:gap-2 md:px-4 md:py-2 md:flex-none ${
                  active
                    ? "flex-auto px-3 bg-primary text-primary-foreground shadow-md"
                    : "shrink-0 glass-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "hidden md:block" : ""}`} />
                <span className={active ? "" : "hidden md:inline"}>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full bg-background/30 text-current tabular-nums ${
                    active ? "hidden md:inline" : ""
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Display Grid (Fast Loading Cards with Screenshots) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-md:gap-4">
          {filteredProjects.map((project) => {
            const meta = statusMeta[project.status];

            return (
              <CardShell
                key={project.name}
                url={project.url}
                className="proj-card project-card group relative flex flex-col rounded-2xl overflow-hidden glass-card gold-border-hover border border-border/60 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card/60"
              >
                {/* Top Screenshot Container */}
                {project.image ? (
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-muted border-b border-border/40">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="eager"
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                    
                    {/* Status Pill Badge over Screenshot */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-[11px] font-body text-foreground shadow-md">
                      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                      <span>{meta.label}</span>
                    </div>

                    {project.url && (
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-md text-foreground group-hover:text-primary transition-colors shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 pb-0 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </span>
                    {!project.url && <Lock className="w-4 h-4 text-muted-foreground/50" />}
                  </div>
                )}

                {/* Card Body Details */}
                <div className="flex flex-1 flex-col justify-between p-6 max-md:p-4">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <span className="font-heading text-xs tabular-nums text-muted-foreground/80 mt-1">
                        {project.year}
                      </span>
                    </div>

                    <p className="font-body text-xs font-medium text-primary/90 mb-3">
                      {project.kicker}
                    </p>

                    <p className="font-body text-xs leading-relaxed text-muted-foreground line-clamp-3 mb-4">
                      {project.body}
                    </p>
                  </div>

                  {/* Specs or Tag Footer */}
                  <div className="pt-3 border-t border-border/40 flex flex-wrap gap-2 items-center justify-between">
                    {project.specs ? (
                      <div className="flex flex-wrap gap-1.5">
                        {project.specs.map((s) => (
                          <span key={s.label} className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/40">
                            {s.value}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] font-heading font-medium uppercase tracking-wider text-muted-foreground/70">
                        #{project.tag || project.category}
                      </span>
                    )}

                    {project.url && !project.image && (
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                    )}
                  </div>
                </div>
              </CardShell>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
