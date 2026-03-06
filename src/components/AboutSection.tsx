import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;

    els.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const stats = [
    { value: "3.10+", label: "Years Experience" },
    { value: "15+", label: "Projects Shipped" },
    { value: "5+", label: "SaaS Products" },
    { value: "∞", label: "Pixels Perfected" },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding noise-bg relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="reveal text-4xl md:text-6xl font-heading font-bold tracking-tight mb-12">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="reveal text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6 font-body max-w-3xl">
          <p>
            If you're looking to <span className="text-foreground font-medium">build a website</span>, <span className="text-foreground font-medium">mobile app</span> or <span className="text-foreground font-medium">software solution</span>, I'm a developer for hire with 3.10+ years of experience. I build custom websites, web apps, iOS/Android apps and SaaS products — from idea to launch.
          </p>
          <p>
            I use <span className="text-foreground font-medium">React.js, Next.js, React Native & Flutter</span> with Supabase and Firestore to ship production-ready software. Whether you need a landing page, a full web application or an app on the stores, I handle design, development and deployment.
          </p>
          <p>
            I also handle <span className="text-foreground font-medium">app store publishing</span> — Google Play Console and Apple App Store Connect — so your mobile app goes live end-to-end.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card gold-border-hover p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
