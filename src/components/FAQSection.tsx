import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, Sparkles } from "lucide-react";

/**
 * These questions and answers are mirrored as FAQPage JSON-LD in index.html.
 * Google requires structured data to match what the user actually sees.
 */
interface FAQItem {
  question: string;
  answer: string;
  category: "hiring" | "services" | "tech" | "publishing";
  tags?: string[];
  ctaUrl?: string;
  ctaText?: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is CvSuhail available for hire?",
    answer:
      "Yes. I take full-time roles, contract engagements and fixed-scope project work, and I work remotely with teams worldwide from Kerala, India (UTC+05:30). Message +91 95627 70397 on WhatsApp or email cvsuhail.ckd@gmail.com.",
    category: "hiring",
    tags: ["Full-time", "Contract", "Remote", "Worldwide"],
    ctaUrl: "https://wa.me/919562770397?text=Hi%20CvSuhail%2C%20I%20want%20to%20discuss%20hiring%20you.",
    ctaText: "Chat on WhatsApp",
  },
  {
    question: "Who can build a website for my business?",
    answer:
      "I build custom websites for businesses — marketing sites, landing pages and full web applications — using React, Next.js and TypeScript. Share your goals and I'll propose a plan and timeline.",
    category: "services",
    tags: ["React.js", "Next.js", "TypeScript", "Websites"],
  },
  {
    question: "Where can I find a developer to build a mobile app?",
    answer:
      "I develop iOS and Android apps with React Native and Flutter, and handle design, development and publishing to the Google Play Store and Apple App Store. HabiLife, live on all three platforms, is an example of my mobile work.",
    category: "services",
    tags: ["iOS", "Android", "React Native", "Flutter"],
  },
  {
    question: "I need a software solution — who can build it?",
    answer:
      "I build web apps, SaaS products, dashboards and custom business software on React, Next.js, Node.js, MongoDB and PostgreSQL. I've shipped multi-tenant SaaS including FestFloww and Peedia.online.",
    category: "services",
    tags: ["SaaS", "Full-Stack", "Node.js", "MongoDB", "PostgreSQL"],
  },
  {
    question: "How much experience does CvSuhail have?",
    answer:
      "4+ years of professional experience since April 2022, across Keibot Learning Solutions, UnitVilla LLC, SSF Kerala and my own SaaS company Peedia.online. I hold a BCA from Malabar College of Advanced Studies.",
    category: "tech",
    tags: ["4+ Years Experience", "BCA", "SaaS Cofounder"],
  },
  {
    question: "What technologies does CvSuhail work with?",
    answer:
      "React.js, Next.js and TypeScript on the frontend; React Native and Flutter for mobile; Node.js and Express on the backend; MongoDB, PostgreSQL, Firebase and Redis for data; Docker, GitHub Actions, Azure and Vercel for deployment.",
    category: "tech",
    tags: ["Frontend", "Mobile", "Backend", "Cloud & DevOps"],
  },
  {
    question: "Can he publish my app to the App Store and Play Store?",
    answer:
      "Yes. I handle release builds, store listings and publishing through Google Play Console and Apple App Store Connect, plus ongoing updates. I also built AppReady, a tool for Google Play's closed testing requirement.",
    category: "publishing",
    tags: ["Google Play", "Apple App Store", "AppReady"],
  },
  {
    question: "Can he work as a developer inside a company team?",
    answer:
      "Yes. I own features end to end in product teams, collaborate with designers and stakeholders, and ship production releases. I currently work this way with SSF Kerala's technology team and UnitVilla LLC.",
    category: "hiring",
    tags: ["Team Player", "Feature Ownership", "Agile"],
  },
  {
    question: "How do I hire CvSuhail for my project?",
    answer:
      "Message +91 95627 70397 on WhatsApp or email cvsuhail.ckd@gmail.com with the problem, rough timeline and scope. I'll reply with an execution plan and next steps.",
    category: "hiring",
    tags: ["WhatsApp", "Email", "Fast Response"],
    ctaUrl: "https://wa.me/919562770397?text=Hi%20CvSuhail%2C%20I%20have%20a%20project%20enquiry.",
    ctaText: "Start Discussion",
  },
];

const categories = [
  { id: "all", label: "All Questions" },
  { id: "hiring", label: "Hiring & Availability" },
  { id: "services", label: "Web & Mobile Services" },
  { id: "tech", label: "Tech & Experience" },
  { id: "publishing", label: "Store Publishing" },
];

const FAQSection = () => {
  // Single card expansion state (only 1 card open at a time)
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredFaqs = faqs.filter((faq) => {
    return activeCategory === "all" || faq.category === activeCategory;
  });

  return (
    <section id="faq" className="section-padding noise-bg relative overflow-hidden">
      {/* Glow background accent */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(43 80% 55% / 0.4), transparent)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full w-fit bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-muted-foreground font-body text-base md:text-lg mb-8 max-w-2xl">
          Everything you need to know about hiring CvSuhail, project scopes, mobile app publishing, and tech stack capabilities.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Expandable Accordion Cards Container */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="glass-card p-8 text-center rounded-2xl">
              <p className="text-muted-foreground font-body">No matching questions found.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                }}
                className="mt-3 text-xs font-semibold text-primary hover:underline"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredFaqs.map((item, index) => {
              const isOpen = openIndex === index;
              const globalIndex = faqs.findIndex((f) => f.question === item.question);
              const formattedNumber = String(globalIndex + 1).padStart(2, "0");

              return (
                <div
                  key={item.question}
                  className={`glass-card rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-primary/60 shadow-[0_0_25px_rgba(234,179,8,0.12)] bg-card/80"
                      : "gold-border-hover hover:border-primary/30"
                  }`}
                >
                  {/* Clickable Header Button */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 focus:outline-none group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Item Number */}
                      <span className={`text-xs font-heading font-bold px-2.5 py-1 rounded-md transition-colors ${
                        isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}>
                        {formattedNumber}
                      </span>
                      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    {/* Chevron Indicator */}
                    <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                      isOpen ? "bg-primary/20 text-primary rotate-180" : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expandable Answer Content (Only 1 card expanded at a time) */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 border-t border-border/30 mt-1">
                        <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed pt-4">
                          {item.answer}
                        </p>

                        {/* Optional Tags & CTA */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-border/20">
                          {item.tags && (
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.map((tag) => (
                                <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/90 border border-primary/20">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {item.ctaUrl && (
                            <a
                              href={item.ctaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline ml-auto"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{item.ctaText || "Contact CvSuhail"}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA block */}
        <div className="mt-12 glass-card gold-border p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="text-lg font-heading font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Have a specific project or question?</span>
            </h4>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Message CvSuhail directly on WhatsApp or test the AI chat assistant below for immediate answers.
            </p>
          </div>
          <a
            href={`https://wa.me/919562770397?text=${encodeURIComponent("Hi CvSuhail, I read your FAQ and have a question regarding a project.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs md:text-sm font-heading font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg"
          >
            Ask on WhatsApp (+91 95627 70397)
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
