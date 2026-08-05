import { Globe, Smartphone, Code2 } from "lucide-react";

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
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding noise-bg relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          What I <span className="text-gradient">Build</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-16 max-w-2xl">
          Looking to build a website, mobile app or software solution? I deliver end-to-end development — from idea to launch.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="glass-card gold-border-hover p-6 md:p-8 flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary mb-6">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                {title}
              </h3>
              <p className="text-muted-foreground font-body flex-1">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
