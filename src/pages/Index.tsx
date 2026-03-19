import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import AIChatWidget from "@/components/AIChatWidget";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ResumeSection />
      <FAQSection />
      <ContactSection />
      <AIChatWidget />
    </main>
  );
};

export default Index;
