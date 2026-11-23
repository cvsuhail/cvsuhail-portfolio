import { Globe, Smartphone, Code2, Rocket } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Build a Website",
    description:
      "Custom websites for your business — landing pages, marketing sites, portfolios and full web applications. Responsive, fast and built for growth.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native-feel iOS and Android apps with React Native and Flutter. From idea to App Store and Play Store — design, build, deploy and maintain.",
  },
  {
    icon: Code2,
    title: "Software Solutions",
    description:
      "Web apps, SaaS products, dashboards and custom business software. End-to-end development with modern stack and scalable architecture.",
  },
  {
    icon: Rocket,
    title: "Forward Deployed Engineering",
    description:
      "I work inside your team and with your customers to turn real workflows into shipped software: discovery, rapid prototypes, integrations, AI and LLM features, and production rollout.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4 max-md:hidden">
          What I <span className="text-gradient">Build</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-16 max-w-2xl max-md:text-sm max-md:mb-5">
          Looking to build a website, mobile app or software solution, or need an engineer embedded with your customers? I deliver end to end, from idea to launch.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-md:gap-3">
          {services.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="glass-card gold-border-hover p-6 md:p-8 flex flex-col hover:-translate-y-1 transition-all duration-300 max-md:p-4 max-md:flex-row max-md:gap-3.5"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary text-primary mb-6 max-md:w-10 max-md:h-10 max-md:mb-0 max-md:shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground max-md:text-base max-md:mb-1">
                  {title}
                </h3>
                <p className="text-muted-foreground font-body max-md:text-sm max-md:leading-relaxed">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
