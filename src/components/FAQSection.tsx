const FAQSection = () => {
  const faqs = [
    {
      question: "What kinds of projects can you build?",
      answer:
        "I design and build custom mobile apps, web apps, marketing websites, admin dashboards and SaaS products — from idea and UX through to deployment.",
    },
    {
      question: "Which technologies do you use?",
      answer:
        "On the frontend I use React, Next.js, React Native, Flutter and Tailwind CSS. For the backend I often use Supabase or Firestore along with modern deployment platforms.",
    },
    {
      question: "Can you publish my app to the stores?",
      answer:
        "Yes. I handle app deployment and publishing to both Google Play Console and Apple App Store Connect, including release builds and updates.",
    },
    {
      question: "How do we start working together?",
      answer:
        "Reach out via WhatsApp, email or social links in the contact section with a short description of your idea, timeline and budget. I will respond with next steps and a clear plan.",
    },
  ];

  return (
    <section id="faq" className="section-padding noise-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-8">
          Frequently Asked Questions
        </h2>
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

