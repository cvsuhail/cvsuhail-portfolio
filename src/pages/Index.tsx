import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import HireSection from "@/components/HireSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import MobileBottomNav, { MOBILE_TABS, type MobileTabId } from "@/components/MobileBottomNav";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

const MOBILE_QUERY = "(max-width: 767px)";

const useIsPhone = () => {
  const [isPhone, setIsPhone] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsPhone(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isPhone;
};

// Map a URL hash to a mobile tab. Sections that are not tabs of their own
// open the tab they live in (Hire lives in Contact).
const tabFromHash = (hash: string): MobileTabId | null => {
  const id = hash.replace(/^#/, "");
  if (id === "" || id === "home") return "hero";
  if (id === "hire") return "contact";
  return MOBILE_TABS.some((t) => t.id === id) ? (id as MobileTabId) : null;
};

const Index = () => {
  const isPhone = useIsPhone();
  const [activeTab, setActiveTab] = useState<MobileTabId>(() =>
    typeof window !== "undefined" ? tabFromHash(window.location.hash) ?? "hero" : "hero",
  );
  const [resumeOpen, setResumeOpen] = useState(false);
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  // On phones the URL hash is the source of truth, so the existing in-page
  // links (#projects, #about, #resume …) switch tabs and the back button works.
  useEffect(() => {
    if (!isPhone) return;
    const sync = () => {
      const hash = window.location.hash;
      if (hash === "#resume") {
        setResumeOpen(true);
        history.replaceState(null, "", `#${activeTabRef.current}`);
        return;
      }
      const tab = tabFromHash(hash);
      if (tab) {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };
    // Resume links open the sheet directly, so they don't add a history entry
    // that the back button would have to step over.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href="#resume"]');
      if (!link) return;
      e.preventDefault();
      setResumeOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", onClick);
    };
  }, [isPhone]);

  const selectTab = useCallback((id: MobileTabId) => {
    if (window.location.hash === `#${id}`) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = id;
    }
  }, []);

  const openResume = useCallback(() => setResumeOpen(true), []);

  if (!isPhone) {
    return (
      <main className="bg-background min-h-screen overflow-x-clip w-full max-w-full relative">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <HireSection />
        <ResumeSection />
        <ContactSection />
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen overflow-x-clip w-full max-w-full relative pb-[calc(4rem+env(safe-area-inset-bottom,0px))]">
      <Navbar
        isPhone
        activeTab={activeTab}
        title={activeTab === "hero" ? undefined : MOBILE_TABS.find((t) => t.id === activeTab)?.title}
        onHome={() => selectTab("hero")}
        onOpenResume={openResume}
      />

      <div key={activeTab} className="animate-in fade-in-0 duration-200">
        {activeTab === "hero" && <HeroSection />}
        {activeTab === "about" && <AboutSection />}
        {activeTab === "services" && <ServicesSection />}
        {activeTab === "skills" && <SkillsSection />}
        {activeTab === "projects" && <ProjectsSection />}
        {activeTab === "contact" && (
          <>
            <HireSection />
            <ContactSection />
          </>
        )}
      </div>

      <MobileBottomNav activeTab={activeTab} onSelect={selectTab} />

      <Drawer open={resumeOpen} onOpenChange={setResumeOpen}>
        <DrawerContent className="max-h-[92dvh]">
          <DrawerHeader className="text-left pb-2">
            <DrawerTitle className="font-heading text-2xl">Resume</DrawerTitle>
            <DrawerDescription>Experience, skills and education.</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom,0px)]">
            <ResumeSection inSheet />
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
};

export default Index;
