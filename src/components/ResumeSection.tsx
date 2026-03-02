import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Code2, Smartphone, Server, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Software Engineer (Frontend-Focused Full Stack & Ecommerce)",
    company: "UnitVilla LLC",
    location: "Remote (Vancouver, BC)",
    duration: "Dec 2024 – Present",
  },
  {
    role: "Junior Software Engineer (Web & Ecommerce Development)",
    company: "Keibot Learning Solutions Pvt Ltd",
    location: "Hybrid (Kannur, Kerala, India)",
    duration: "Apr 2022 – Nov 2024",
  },
];

const skillCategories = [
  { icon: Code2, title: "Frontend", skills: "React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, GSAP" },
  { icon: Smartphone, title: "Mobile", skills: "React Native, Flutter, Dart, iOS & Android Development" },
  { icon: Server, title: "Backend", skills: "Supabase, Firebase, Firestore, Node.js, REST APIs" },
  { icon: Wrench, title: "DevOps & Tools", skills: "Play Store Console, App Store Connect, Git, Figma, VS Code, Vercel" },
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
          <span className="text-gradient">Resume</span>
        </h2>
        <p className="resume-reveal text-muted-foreground font-body text-lg mb-16 max-w-xl">
          A structured overview of my professional journey.
        </p>

        {/* Experience */}
        <div className="resume-reveal glass-card gold-border-hover p-8 mb-8">
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
              </div>
            ))}
          </div>
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

        {/* Education */}
        <div className="resume-reveal glass-card gold-border-hover p-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-heading font-bold text-foreground">Education</h3>
          </div>
          <div className="pl-6 border-l-2 border-primary/30 relative">
            <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
            <h4 className="text-lg font-heading font-semibold text-foreground">Bachelor of Computer Application (BCA)</h4>
            <p className="text-primary font-heading font-medium text-sm mt-1">Malabar College of Advanced Studies</p>
            <p className="text-muted-foreground font-body text-sm">Affiliated to Calicut University</p>
            <p className="text-muted-foreground font-body text-xs mt-1">2019 – 2022</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
