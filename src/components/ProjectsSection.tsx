import { useState, type ReactNode } from "react";
import { ArrowUpRight, Lock, Sparkles, Layers, Globe, Code2 } from "lucide-react";

type Status = "live" | "building" | "internal";

type Project = {
  name: string;
  kicker: string;
  category: "saas" | "website" | "hobby";
  year: string;
  status: Status;
  body: string;
  specs?: { label: string; value: string }[];
  image?: string;
  url?: string;
  tag?: string;
};

const statusMeta: Record<Status, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-amber-400" },
  building: { label: "In Active Build", dot: "bg-primary" },
  internal: { label: "Internal Platform", dot: "bg-muted-foreground/70" },
};

const allProjects: Project[] = [
  // 1. Featured SaaS & Mobile Platforms
  {
    name: "FestFloww",
    kicker: "Program management SaaS for SSF Kerala",
    category: "saas",
    year: "2025 — now",
    status: "live",
    image: "/projects/festfloww.png",
    body:
      "SSF runs festivals with thousands of participants spread across hundreds of local units. FestFloww took over registration, judging, live scoring and certificate generation across a multi-level org hierarchy.",
    specs: [
      { label: "Role", value: "Led engineering" },
      { label: "Stack", value: "Next.js · Node.js · MongoDB" },
    ],
    url: "https://festfloww.com",
  },
  {
    name: "Peedia.online",
    kicker: "Multi-tenant ecommerce SaaS platform",
    category: "saas",
    year: "2025 — now",
    status: "building",
    image: "/projects/peedia.online.png",
    body:
      "Cofounded ecommerce SaaS where every merchant gets an independent storefront running on shared multi-tenant infrastructure, with WhatsApp ordering and AI automation.",
    specs: [
      { label: "Role", value: "Cofounder & architect" },
      { label: "Stack", value: "Next.js · Node.js · Postgres" },
    ],
    url: "https://peedia.online",
  },
  {
    name: "HabiLife",
    kicker: "Health and habit tracking across iOS, Android & Web",
    category: "saas",
    year: "2024 — now",
    status: "live",
    image: "/projects/habilife.png",
    body:
      "Built Flutter and React Native mobile apps and Next.js web version at UnitVilla. Features Apple HealthKit sync, offline storage, and push notifications.",
    specs: [
      { label: "Role", value: "Mobile & web lead" },
      { label: "Stack", value: "Flutter · React Native · Next.js" },
    ],
    url: "https://habilife.app",
  },
  {
    name: "Netor.ai",
    kicker: "AI-assisted networking and connection platform",
    category: "saas",
    year: "2025",
    status: "live",
    image: "/projects/netor.png",
    body:
      "Solves low-value networking noise using AI-assisted opportunity discovery and smart connection matching for tech professionals.",
    specs: [
      { label: "Role", value: "Full-Stack Dev" },
      { label: "Stack", value: "React · Node.js · AI APIs" },
    ],
    url: "https://netor.ai",
  },
  {
    name: "AppReady",
    kicker: "Google Play closed-testing automation SaaS",
    category: "saas",
    year: "2025",
    status: "live",
    image: "/projects/AppReady.png",
    body:
      "Tooling that automates Google Play's 14-day closed testing requirement — SDK wiring, tester activity tracking via Cloud Functions.",
    specs: [
      { label: "Role", value: "Creator" },
      { label: "Stack", value: "React · Node.js · Cloud Functions" },
    ],
    url: "https://apprdy.cvsuhail.online",
  },

  // 2. Client Websites & Static Web Experiences
  {
    name: "Kerala Sahityotsav",
    kicker: "Official grand festival web platform",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/keralaSahityotsav.png",
    body:
      "Official website for Kerala Sahityotsav — event schedules, live updates, announcements, and participant information delivered with fast page loads.",
    specs: [
      { label: "Type", value: "Event Platform" },
      { label: "Stack", value: "React · Next.js · Tailwind" },
    ],
    url: "https://keralasahityotsav.com",
  },
  {
    name: "Sahityotsav Portal",
    kicker: "State & District cultural festival portal",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/sahityotsav.png",
    body:
      "High-traffic cultural festival digital hub handling program details, announcements, and real-time result broadcasts across Kerala.",
    specs: [
      { label: "Type", value: "High-Traffic Hub" },
      { label: "Stack", value: "Next.js · TypeScript" },
    ],
    url: "https://sahityotsav.com",
  },
  {
    name: "Sensorium",
    kicker: "Digital operations & festival web experience",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/sensorium.png",
    body:
      "Digital operations and web platform for Sensorium SSF Kerala — workflow coordination, digital passes, and event record management.",
    specs: [
      { label: "Type", value: "Digital Experience" },
      { label: "Stack", value: "Next.js · React" },
    ],
    url: "https://sensorium.ssfkerala.org/",
  },
  {
    name: "Reelman Uniforms",
    kicker: "Custom uniform manufacturing & brand showcase",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/reelmanuniforms.png",
    body:
      "Official web showcase for Reelman Uniforms — commercial uniform catalog, custom order inquiries, and brand portfolio.",
    specs: [
      { label: "Type", value: "Brand Showcase" },
      { label: "Stack", value: "React · Tailwind CSS" },
    ],
    url: "https://reelmanuniforms.com",
  },
  {
    name: "Reelman Bespoke",
    kicker: "Bespoke tailoring & luxury apparel web experience",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/reelmanbespoke.png",
    body:
      "High-end bespoke tailoring digital storefront featuring custom fitting booking, gallery showcases, and brand storytelling.",
    specs: [
      { label: "Type", value: "Luxury Brand Site" },
      { label: "Stack", value: "React · Modern Styling" },
    ],
    url: "https://reelmanbespoke.com",
  },
  {
    name: "Yas Orcin",
    kicker: "Creative brand & web experience",
    category: "website",
    year: "2024",
    status: "live",
    image: "/projects/yas.png",
    body:
      "Modern web experience built for Yas Orcin — responsive layouts, interactive elements, and fast Vercel hosting deployment.",
    specs: [
      { label: "Type", value: "Web Experience" },
      { label: "Stack", value: "Next.js · Vercel" },
    ],
    url: "https://yas-orcin.vercel.app",
  },

  // 3. Hobby Projects & Experiments
  {
    name: "PlanUndo",
    kicker: "Social activity discovery & real-world meetups",
    category: "hobby",
    year: "2024",
    status: "live",
    image: "/projects/planundo.png",
    body:
      "Find people nearby, plan activities, and show up. Social discovery platform built around real-world events and activity coordination.",
    tag: "Hobby Project",
    url: "https://planundo.online",
  },
  {
    name: "BrandQR",
    kicker: "Smart QR code & digital profile generator",
    category: "hobby",
    year: "2024",
    status: "live",
    image: "/projects/brandQR.png",
    body:
      "Custom smart QR codes and digital business profile cards for businesses and professionals to share contact details instantly.",
    tag: "Hobby Project",
    url: "https://brandqr.site",
  },
  {
    name: "Umigle",
    kicker: "Real-time P2P WebRTC video chat application",
    category: "hobby",
    year: "2024",
    status: "live",
    image: "/projects/umigle.png",
    body:
      "Real-time video chat built over WebRTC peer connections without central media server relaying, exploring WebRTC connection resilience.",
    tag: "WebRTC Experiment",
    url: "https://umigle.cvsuhail.online/",
  },
];

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
      {/* Subtle background glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-10 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(43 80% 55%), transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
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

        {/* Intuitive Category Tabs for Quick Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-border/40">
          {[
            { id: "all", label: "All Projects", icon: Layers, count: allProjects.length },
            { id: "saas", label: "SaaS & Mobile Apps", icon: Sparkles, count: saasProjects.length },
            { id: "website", label: "Client Websites", icon: Globe, count: websiteProjects.length },
            { id: "hobby", label: "Hobby & Experiments", icon: Code2, count: hobbyProjects.length },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-background/30 text-current">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Display Grid (Fast Loading Cards with Screenshots) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="flex flex-1 flex-col justify-between p-6">
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
