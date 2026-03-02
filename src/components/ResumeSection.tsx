import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Code2, Smartphone, Server, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    role: "Frontend Engineer",
    duration: "3.10+ Years",
    highlights: [
      "Built & shipped 15+ production apps and websites",
      "Specialized in React.js, Next.js, React Native & Flutter",
      "Expert in Play Store Console & App Store Connect deployment",
      "Full-stack development with Supabase & Firebase BaaS",
    ],
  },
];

const skillCategories = [
  { icon: Code2, title: "Frontend", skills: "React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, GSAP" },
  { icon: Smartphone, title: "Mobile", skills: "React Native, Flutter, Dart, iOS & Android Development" },
  { icon: Server, title: "Backend", skills: "Supabase, Firebase, Firestore, Node.js, REST APIs" },
  { icon: Wrench, title: "DevOps", skills: "Play Store Console, App Store Connect, Git, Vercel, Figma" },
];

const ResumeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".resume-reveal");
    if (!els) return;

    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section id="resume" ref={sectionRef} className="section-padding noise-bg relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="resume-reveal text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
          ATS <span className="text-gradient">Resume</span>
        </h2>
        <p className="resume-reveal text-muted-foreground font-body text-lg mb-16 max-w-xl">
          A structured overview of my professional journey — optimized for both humans and machines.
        </p>

        {/* Experience */}
        <div className="resume-reveal glass-card gold-border-hover p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-bold text-foreground">Experience</h3>
          </div>
          {experience.map((exp) => (
            <div key={exp.role}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h4 className="text-lg font-heading font-semibold text-foreground">{exp.role}</h4>
                <span className="text-sm text-primary font-heading font-medium">{exp.duration}</span>
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((h) => (
                  <li key={h} className="text-muted-foreground font-body text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {skillCategories.map(({ icon: Icon, title, skills }) => (
            <div key={title} className="resume-reveal glass-card gold-border-hover p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-primary" />
                <h4 className="font-heading font-semibold text-foreground">{title}</h4>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{skills}</p>
            </div>
          ))}
        </div>

        {/* Education placeholder */}
        <div className="resume-reveal glass-card gold-border-hover p-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-bold text-foreground">Education</h3>
          </div>
          <p className="text-muted-foreground font-body text-sm">
            Self-taught developer with a passion for continuous learning. Proficient through hands-on experience building real-world products and platforms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
