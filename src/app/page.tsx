"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HeroPhotoStrip } from "@/components/HeroPhotoStrip";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { WhyKreatorsLab } from "@/components/WhyKreatorsLab";
import { LearningMethod } from "@/components/LearningMethod";
import { AILiteracySection } from "@/components/AILiteracySection";
import { MentorsSection } from "@/components/MentorsSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { GalleryPreview } from "@/components/GalleryPreview";
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
          onWatchVideo={() => setIsVideoModalOpen(true)}
        />

        {/* 2.5 Dynamic Studio Photo Marquee Strip (Right Below Hero Video) */}
        <HeroPhotoStrip />

        {/* 3. Student Project Showcase (Clean Interactive Cards Grid) */}
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

        {/* 4. Unique Selling Proposition: Critical Thinking, Signature Method & AI Literacy */}
        {/* 4.1 Critical Thinking and Ownership */}
        <WhyKreatorsLab />

        {/* 4.2 Project-Building Process: The Kreators Lab signature method */}
        <LearningMethod />

        {/* 4.3 AI Literacy: Distinct Program Benefit */}
        <AILiteracySection
          onLearnMore={() => handleOpenInquiry({ program: "AI Literacy & Curriculum Inquiry" })}
        />

        {/* 7. Parent Testimonials: Authentic Stories from Austin & Lake Travis */}
        <TestimonialsSection onWatchVideo={() => setIsVideoModalOpen(true)} />

        {/* 8. Life at Kreators Lab: Authentic Gallery Bento Preview (Photos & Videos) */}
        <GalleryPreview />

        {/* 5. Founder's Letter & Guidance Content */}
        <MentorsSection onMeetTeam={() => handleOpenInquiry({ program: "Educator Guidance Inquiry" })} />

        {/* 9. FAQ Section: Good Questions Deserve Clear Answers */}
        <FAQSection />

        {/* Interactive Program Finder (for filter & cohort search) */}
        <ProgramFinder onOpenInquiry={handleOpenInquiry} />

        {/* Final Closing CTA */}
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
        videoSrc="/videos/KREATORS.mp4"
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        prefilled={inquiryPrefill}
      />
    </div>
  );
}
