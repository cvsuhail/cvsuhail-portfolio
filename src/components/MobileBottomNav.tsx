import React, { useState, useEffect } from "react";
import { User, FolderGit2, MessageSquare, Bot } from "lucide-react";

interface MobileBottomNavProps {
  onOpenAI: () => void;
  isAIOpen: boolean;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenAI, isAIOpen }) => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["about", "projects", "contact"];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If AI Chat is active full screen on mobile, hide the bottom navigation bar
  if (isAIOpen) return null;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/80 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-around shadow-[0_-10px_25px_rgba(0,0,0,0.5)] min-h-[60px]">
      {/* About Tab */}
      <button
        onClick={() => scrollTo("about")}
        className={`flex flex-col items-center justify-center gap-1 active:scale-95 transition-all py-1 px-3 rounded-full ${
          activeSection === "about"
            ? "text-primary font-bold bg-primary/10 border border-primary/20"
            : "text-muted-foreground hover:text-primary font-medium"
        }`}
        aria-label="About Section"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-heading tracking-tight">About</span>
      </button>

      {/* Projects Tab */}
      <button
        onClick={() => scrollTo("projects")}
        className={`flex flex-col items-center justify-center gap-1 active:scale-95 transition-all py-1 px-3 rounded-full ${
          activeSection === "projects"
            ? "text-primary font-bold bg-primary/10 border border-primary/20"
            : "text-muted-foreground hover:text-primary font-medium"
        }`}
        aria-label="Projects Section"
      >
        <FolderGit2 className="w-5 h-5" />
        <span className="text-[10px] font-heading tracking-tight">Projects</span>
      </button>

      {/* Contact Tab */}
      <button
        onClick={() => scrollTo("contact")}
        className={`flex flex-col items-center justify-center gap-1 active:scale-95 transition-all py-1 px-3 rounded-full ${
          activeSection === "contact"
            ? "text-primary font-bold bg-primary/10 border border-primary/20"
            : "text-muted-foreground hover:text-primary font-medium"
        }`}
        aria-label="Contact Section"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px] font-heading tracking-tight">Contact</span>
      </button>

      {/* AI Chat Tab */}
      <button
        onClick={onOpenAI}
        className={`flex flex-col items-center justify-center gap-1 active:scale-95 transition-all py-1 px-3 rounded-full ${
          isAIOpen
            ? "text-primary font-bold bg-primary/20 border border-primary/30"
            : "text-muted-foreground hover:text-primary font-medium"
        }`}
        aria-label="Open AI Chat"
      >
        <Bot className="w-5 h-5 text-primary" />
        <span className="text-[10px] font-heading tracking-tight font-semibold text-primary">CV's AI</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
