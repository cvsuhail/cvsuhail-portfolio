import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-5"
      style={{ background: "hsla(0, 0%, 4%, 0.8)", backdropFilter: "blur(20px)" }}
    >
      <button onClick={() => scrollTo("hero")} className="font-heading text-xl font-bold tracking-tight text-foreground">
        Cv<span className="text-gradient">Suhail</span>
      </button>
      <div className="hidden md:flex items-center gap-8">
        {["About", "Skills", "Projects", "Resume", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase())}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
          >
            {item}
          </button>
        ))}
      </div>
      <button
        onClick={() => scrollTo("contact")}
        className="px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-heading"
      >
        Let's Talk
      </button>
    </nav>
  );
};

export default Navbar;
