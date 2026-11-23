import {
  Briefcase,
  GraduationCap,
  Code2,
  Smartphone,
  Server,
  Database,
  Cloud,
  Layers,
  Rocket,
  Sparkles,
  Download,
  type LucideIcon,
} from "lucide-react";
import { CV_PDF_PATH, education, experiences, skillCategories } from "@/data/resume";

// Icons per skill category; categories without one fall back to Layers.
const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  Mobile: Smartphone,
  Backend: Server,
  Databases: Database,
  "DevOps & Cloud": Cloud,
  Architecture: Layers,
  "Forward Deployed Engineering": Rocket,
  "AI Development Tools": Sparkles,
};

const DownloadCvButton = ({ className = "" }: { className?: string }) => (
  <a
    href={CV_PDF_PATH}
    download="Muhammed-Suhail-CV.pdf"
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 ${className}`}
  >
    <Download className="h-4 w-4" />
    Download CV (PDF)
  </a>
);

const ResumeSection = ({ inSheet = false }: { inSheet?: boolean }) => {
  // In the mobile bottom sheet the sheet header already titles it, so drop the
  // big heading and the section's page-sized padding.
  const card = inSheet ? "p-5" : "p-8";
  return (
    <section
      id="resume"
      className={inSheet ? "px-4 pt-2 pb-6 relative" : "section-padding noise-bg relative"}
    >
      <div className="max-w-5xl mx-auto">
        {inSheet ? (
          <DownloadCvButton className="w-full mb-4" />
        ) : (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
                <span className="text-gradient">Resume</span>
              </h2>
              <p className="text-muted-foreground font-body text-lg max-w-xl">
                A structured overview of my professional journey.
              </p>
            </div>
            <DownloadCvButton className="self-start md:self-auto" />
          </div>
        )}

        {/* Experience */}
        <div className={`glass-card gold-border-hover ${card} ${inSheet ? "mb-4" : "mb-8"}`}>
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-bold text-foreground">Experience</h3>
          </div>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.company} className="relative pl-6 border-l-2 border-primary/30">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
                <h4 className="text-lg font-heading font-semibold text-foreground">{exp.role}</h4>
                <p className="text-primary font-heading font-medium text-sm mt-1">{exp.company}</p>
                <p className="text-muted-foreground font-body text-sm">{exp.location}</p>
                <p className="text-muted-foreground font-body text-xs mt-1">{exp.duration}</p>
                <p className="text-muted-foreground/80 font-body text-sm mt-2 leading-relaxed">{exp.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className={`grid sm:grid-cols-2 ${inSheet ? "gap-3" : "gap-4"}`}>
          {skillCategories.map(({ title, skills }) => {
            const Icon = categoryIcons[title] ?? Layers;
            return (
              <div key={title} className={`glass-card gold-border-hover ${inSheet ? "p-4" : "p-6"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <h4 className="font-heading font-semibold text-foreground">{title}</h4>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{skills}</p>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <div className={`glass-card gold-border-hover ${card} ${inSheet ? "mt-4" : "mt-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-bold text-foreground">Education</h3>
          </div>
          <div className="pl-6 border-l-2 border-primary/30 relative">
            <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
            <h4 className="text-lg font-heading font-semibold text-foreground">{education.degree}</h4>
            <p className="text-primary font-heading font-medium text-sm mt-1">{education.school}</p>
            <p className="text-muted-foreground font-body text-sm">{education.affiliation}</p>
            <p className="text-muted-foreground font-body text-xs mt-1">{education.duration}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
