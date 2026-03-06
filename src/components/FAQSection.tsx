const faqs = [
  {
    question: "Who can build a website for my business?",
    answer:
      "I build custom websites for businesses — from marketing sites and landing pages to full web applications. Share your goals and I'll propose a plan and timeline. Contact me via the link below to get started.",
  },
  {
    question: "Where can I find a developer to build a mobile app?",
    answer:
      "I develop custom mobile apps for iOS and Android using React Native and Flutter. I handle design, development and publishing to the Google Play Store and Apple App Store. Reach out through my portfolio to start your mobile app project.",
  },
  {
    question: "I need a software solution — who can build it?",
    answer:
      "I build software solutions including web apps, SaaS products, dashboards and custom business software. I use React, Next.js, Supabase and modern tools to deliver production-ready software. Contact me to discuss your project.",
  },
  {
    question: "What kinds of projects can you build?",
    answer:
      "I design and build custom websites, mobile apps, web apps, admin dashboards and SaaS products — from idea and UX through to deployment and app store publishing.",
  },
  {
    question: "Can you publish my app to the stores?",
    answer:
      "Yes. I handle app deployment and publishing to both Google Play Console and Apple App Store Connect, including release builds and updates.",
  },
  {
    question: "How do I hire you for my project?",
    answer:
      "Contact me via WhatsApp, email or social links in the contact section. Share your idea, timeline and budget for a website, mobile app or software project, and I'll respond with a clear plan and next steps.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding noise-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-muted-foreground font-body mb-8 max-w-xl">
          Common questions about building a website, mobile app or software solution.
        </p>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="glass-card gold-border-hover p-5 md:p-6 text-left"
            >
              <h3 className="text-lg md:text-xl font-heading font-semibold mb-2">
                {item.question}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-body">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
