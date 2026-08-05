import { MessageCircle, Mail, FileText } from "lucide-react";

/**
 * Hiring facts, written as discrete statements rather than prose.
 * Search engines and AI assistants answering "who can build my app" need to
 * extract availability, location and scope — bury those in a paragraph and
 * they get missed.
 */
const facts = [
  { label: "Status", value: "Available — taking on new work" },
  { label: "Engagement", value: "Full-time roles, contract, or fixed-scope projects" },
  { label: "Based in", value: "Kerala, India (UTC+05:30) — works remotely, worldwide" },
  { label: "Experience", value: "4+ years, professionally since April 2022" },
  { label: "Owns", value: "Planning, UX, engineering, deployment, and app store release" },
  { label: "Core stack", value: "React · Next.js · TypeScript · React Native · Flutter · Node.js · MongoDB · PostgreSQL" },
];

const buildsFor = [
  {
    title: "Founders with an idea and no team",
    detail:
      "You have the problem and the customers. I handle everything between that and a live product on the web or in the stores.",
  },
  {
    title: "Companies hiring an engineer",
    detail:
      "I join product teams full-time or on contract, own features end to end, and ship to production without needing hand-holding.",
  },
  {
    title: "Businesses stuck on an existing build",
    detail:
      "Half-finished app, a stalled Play Store release, or a site nobody can maintain. I have picked up all three before.",
  },
];

const whatsappUrl = `https://wa.me/919562770397?text=${encodeURIComponent(
  "Hi CvSuhail, I found your portfolio and would like to discuss a project."
)}`;

const HireSection = () => {
  return (
    <section id="hire" className="section-padding noise-bg relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-4 font-heading text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Open for work
        </p>
        <h2 className="mb-4 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          Hire <span className="text-gradient">CvSuhail</span>
        </h2>
        <p className="mb-12 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          I'm Muhammed Suhail CV, a product engineer in Kerala, India. I build websites,
          mobile apps and SaaS platforms end to end — one person, from the first sketch
          to the App Store listing.
        </p>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Fact sheet */}
          <div className="project-card lg:col-span-3">
            <dl className="divide-y divide-border/40">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-6 md:px-8"
                >
                  <dt className="flex-shrink-0 pt-px font-heading text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 sm:w-28">
                    {fact.label}
                  </dt>
                  <dd className="font-body text-sm leading-relaxed text-foreground/85">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact card */}
          <div className="project-card flex flex-col justify-between gap-6 p-6 md:p-8 lg:col-span-2">
            <div>
              <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">
                Start a conversation
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                Send the problem, a rough timeline and whatever scope you have. You'll get
                an execution plan back, not a brochure.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp — +91 95627 70397
              </a>
              <a
                href="mailto:cvsuhail.ckd@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-secondary/50 px-6 py-3 font-heading text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
              >
                <Mail className="h-4 w-4" />
                cvsuhail.ckd@gmail.com
              </a>
              <a
                href="#resume"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                Read the full resume
              </a>
            </div>
          </div>
        </div>

        {/* Who this is for */}
        <h3 className="mb-6 mt-16 font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Who I usually work with
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {buildsFor.map((item) => (
            <article key={item.title} className="project-card p-6">
              <h4 className="mb-2 font-heading text-base font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="font-body text-[13px] leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireSection;
