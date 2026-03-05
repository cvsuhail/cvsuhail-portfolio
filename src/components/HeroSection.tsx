import { useEffect, useRef } from "react";
import gsap from "gsap";
import suhailImg from "@/assets/suhail.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (!imageRef.current || !nameRef.current || !subtitleRef.current || !badgesRef.current) return;

    const nameChars = nameRef.current.querySelectorAll(".char");

    tl.fromTo(
      imageRef.current,
      { scale: 1.15, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
      { scale: 1, opacity: 1, clipPath: "circle(55% at 50% 50%)", duration: 0.9 }
    )
      .fromTo(
        nameChars,
        { y: 80, opacity: 0, rotateX: -60 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03 },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        badgesRef.current.children,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06 },
        "-=0.3"
      );
  }, []);

  const nameChars = "CvSuhail".split("").map((char, i) => (
    <span key={i} className="char inline-block" style={{ perspective: "500px" }}>
      {char}
    </span>
  ));

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center noise-bg overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(43 80% 55% / 0.3), transparent)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 section-padding text-center">
        {/* Photo */}
        <div
          ref={imageRef}
          className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden gold-border mb-4"
          style={{ boxShadow: "var(--gold-glow-strong)" }}
        >
          <img src={suhailImg} alt="CvSuhail" className="w-full h-full object-cover object-top" />
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="hero-name text-6xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter leading-none text-foreground"
        >
          {nameChars}
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-xl font-body">
          Frontend Engineer crafting <span className="text-foreground font-medium">pixel-perfect</span>,{" "}
          <span className="text-foreground font-medium">performant</span> &{" "}
          <span className="text-foreground font-medium">delightful</span> digital experiences.
        </p>

        {/* Badges */}
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-3 mt-4">
          {["React.js", "Next.js", "React Native", "Flutter", "Supabase"].map((tech) => (
            <span key={tech} className="skill-pill">{tech}</span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-body tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent animate-pulse-gold" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
