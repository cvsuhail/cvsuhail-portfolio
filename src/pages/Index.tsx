import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import HireSection from "@/components/HireSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import AIChatWidget from "@/components/AIChatWidget";

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden w-full max-w-full relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <HireSection />
      <ResumeSection />
      <ContactSection />
      <AIChatWidget />
    </main>
  );
};

export default Index;
