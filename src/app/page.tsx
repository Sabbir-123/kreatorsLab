"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { WhyKreatorsLab } from "@/components/WhyKreatorsLab";
import { LearningMethod } from "@/components/LearningMethod";
import { ParentBenefits } from "@/components/ParentBenefits";
import { ProgramsSection } from "@/components/ProgramsSection";
import { WeeklyJourney } from "@/components/WeeklyJourney";
import { PhilosophySection } from "@/components/PhilosophySection";
import { MentorsSection } from "@/components/MentorsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProgramFinder } from "@/components/ProgramFinder";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";
import { VideoModal } from "@/components/VideoModal";
import { InquiryModal } from "@/components/InquiryModal";
import { ProjectItem, ProgramItem, SectionProgramItem } from "@/data/siteContent";
import { trackEvent } from "@/lib/analytics";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryPrefill, setInquiryPrefill] = useState<Record<string, string>>({});

  const handleOpenInquiry = (prefillData?: Record<string, string>) => {
    if (prefillData) setInquiryPrefill(prefillData);
    setIsInquiryModalOpen(true);
  };

  const handleSelectProgram = (program: ProgramItem | SectionProgramItem) => {
    const grade: string =
      ("gradeSpan" in program && program.gradeSpan) ||
      ("grades" in program && program.grades) ||
      "Ages 9–14";
    trackEvent("program_view", { program_name: program.title, grade_level: grade });
    handleOpenInquiry({ program: program.title, grade });
  };

  const handleExplorePrograms = () => {
    trackEvent("cta_click", { label: "Explore Programs" });
    const el = document.getElementById("programs");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeProjects = () => {
    trackEvent("cta_click", { label: "See What Kids Built" });
    const el = document.getElementById("projects");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Official Sticky Header (Exactly 5 Navigation Links + CTA Button) */}
      <Header onExplorePrograms={handleExplorePrograms} />

      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExplorePrograms={handleExplorePrograms}
          onSeeProjects={handleSeeProjects}
        />

        {/* 2. Student Project Showcase (Directly below Hero) */}
        <ProjectShowcase
          onSelectProject={(project) => setSelectedProject(project)}
          onExploreAll={handleSeeProjects}
        />

        {/* 3. Program Discovery & Offerings (Immediately after Project Section) */}
        <ProgramsSection
          onSelectProgram={handleSelectProgram}
          onViewAll={() => {
            const el = document.getElementById("program-finder");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 4. Why Kreators Lab (Paper-first planning vs screen time) */}
        <WhyKreatorsLab />

        {/* 5. The Kreators Lab Method (5 connected steps: Think, Build, Test, Publish, Present) */}
        <LearningMethod
          onDiscoverMore={() => {
            const el = document.getElementById("about");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 6. Educational Benefits (6 compact habit cards on soft lavender) */}
        <ParentBenefits />

        {/* 8. Inside the Learning Experience / A Week at Kreators Lab (5-Day timeline & Video) */}
        <WeeklyJourney onWatchVideo={() => setIsVideoModalOpen(true)} />

        {/* 9. Brand Philosophy (Prominent deep-purple section: AI is the tool, child is creator) */}
        <PhilosophySection onLearnMore={() => handleOpenInquiry()} />

        {/* 10. Parent Reviews & Testimonials (Authentic stories from Lake Travis, Lakeway, Westlake families) */}
        <TestimonialsSection onWatchVideo={() => setIsVideoModalOpen(true)} />

        {/* 11. Team & Mentors (Real guidance, background-checked educator guidance) */}
        <MentorsSection onMeetTeam={() => handleOpenInquiry()} />

        {/* 12. Program Finder (Clean selectors, matching real programs, parent inquiry) */}
        <ProgramFinder onOpenInquiry={handleOpenInquiry} />

        {/* 13. FAQ (Accessible minimal accordions with 8 exact questions) */}
        <FAQSection />

        {/* 14. Final Closing CTA (Clean deep-purple gradient, tagline, no fake urgency) */}
        <FinalCTA
          onExplorePrograms={handleExplorePrograms}
          onSeeProjects={handleSeeProjects}
        />
      </main>

      {/* 15. Footer (Official logo, Explore, Resources, Connect, Legal, Copyright) */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(projectName) =>
          handleOpenInquiry({ program: `Project Inquiry: ${projectName}` })
        }
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        prefilled={inquiryPrefill}
      />
    </div>
  );
}
