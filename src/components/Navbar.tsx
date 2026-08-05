import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MessageSquare } from "lucide-react";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const navDpRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [showNavDp, setShowNavDp] = useState(false);
  const showNavDpRef = useRef(false);

  useEffect(() => {
    // Entrance reveal for navbar
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);

      // Check visibility of main Hero DP avatar (#hero-dp)
      const heroDpEl = document.getElementById("hero-dp");
      let isHeroDpVisible = false;

      if (heroDpEl) {
        const rect = heroDpEl.getBoundingClientRect();
        // Hero DP is visible if any part of it is below 70px (below top navbar)
        isHeroDpVisible = rect.bottom > 70;
      } else {
        isHeroDpVisible = scrollY <= 250;
      }

      // 1. SHOW NAVBAR DP (Hero DP scrolled out of view) -> FAST 0.25s DROP ANIMATION
      if (!isHeroDpVisible && !showNavDpRef.current) {
        showNavDpRef.current = true;
        setShowNavDp(true);

        if (navDpRef.current) {
          gsap.killTweensOf(navDpRef.current);
          gsap.fromTo(
            navDpRef.current,
            {
              y: -40,
              scaleX: 0.6,
              scaleY: 1.3,
              opacity: 0,
            },
            {
              y: 0,
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
              duration: 0.25, // Snappy fast drop animation
              ease: "back.out(1.8)",
            }
          );
        }
      }
      // 2. HIDE NAVBAR DP (Hero DP is visible in Hero section) -> FAST REVERSE LIFT ANIMATION
      else if (isHeroDpVisible && showNavDpRef.current) {
        showNavDpRef.current = false;

        if (navDpRef.current) {
          gsap.killTweensOf(navDpRef.current);
          gsap.to(navDpRef.current, {
            y: -40,
            scaleX: 0.6,
            scaleY: 1.3,
            opacity: 0,
            duration: 0.2, // Fast snappy hide
            ease: "power2.in",
            onComplete: () => {
              setShowNavDp(false);
            },
          });
        } else {
          setShowNavDp(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 py-3 md:py-3.5 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-xl"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      {/* Brand & Sticky DP Avatar Continuation (Always Reserved Fixed Box Space) */}
      <button
        onClick={() => scrollTo("hero")}
        className="flex items-center gap-2.5 group text-left focus:outline-none"
      >
        {/* Reserved Fixed Box Space for DP: Preserves navbar width so brand text never shifts */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 relative flex items-center justify-center">
          <div
            ref={navDpRef}
            className={`w-full h-full rounded-full border-2 border-primary/60 overflow-hidden bg-background shadow-md group-hover:scale-105 transition-transform duration-300 ${
              showNavDp ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
            }`}
            style={{ boxShadow: "var(--gold-glow)" }}
          >
            <img
              src="/dp.jpeg"
              alt="CvSuhail DP"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
            Cv<span className="text-gradient">Suhail</span>
          </span>
          <span className="text-[10px] font-body text-muted-foreground hidden sm:inline-block">
            Product Engineer
          </span>
        </div>
      </button>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-5">
        {["About", "Services", "Skills", "Projects", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase())}
            className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Quick Action Button (Visible on all screen sizes) */}
      <div className="flex items-center gap-2">
        <a
          href={`https://wa.me/919562770397?text=${encodeURIComponent("Hi CvSuhail, I would like to discuss a project or developer hiring role.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-heading font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-md flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Hire</span>
        </a>
        <button
          onClick={() => scrollTo("contact")}
          className="hidden sm:inline-flex px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-heading"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
