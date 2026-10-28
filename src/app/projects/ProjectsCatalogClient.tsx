"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, FolderSearch } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { InquiryModal } from "@/components/InquiryModal";
import {
  FEATURED_PROJECTS,
  CONFIRMED_PROJECT_CATEGORIES,
  ProjectItem,
} from "@/data/siteContent";

export function ProjectsCatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryPrefill, setInquiryPrefill] = useState<Record<string, string>>({});

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return FEATURED_PROJECTS;
    return FEATURED_PROJECTS.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  const handleOpenInquiry = (prefill?: Record<string, string>) => {
    if (prefill) setInquiryPrefill(prefill);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FE]">
      <Header />

      <main className="flex-1 pt-28 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-3.5 border border-[#35309B]/15 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
              <span>Student Creations • Austin &amp; Lake Travis</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18152B] tracking-tight leading-tight">
              Student Projects Gallery
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#65617A] max-w-xl mx-auto leading-relaxed">
              Explore games, AI companions, web apps, and audio sequencers imagined and coded by young creators in our K–12 cohorts.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-[#35309B]/15 shadow-xs max-w-2xl mx-auto">
              {CONFIRMED_PROJECT_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const label = cat === "All" ? "All Projects" : cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#35309B] text-white shadow-xs scale-102"
                        : "text-[#55506E] hover:text-[#35309B] hover:bg-[#F4F2FF]"
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-white border border-[#35309B]/20 text-center shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#EEECFF] text-[#35309B] mx-auto flex items-center justify-center mb-4">
                <FolderSearch className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#18152B] mb-2">
                No {selectedCategory} Projects Published Yet
              </h3>
              <p className="text-xs sm:text-sm text-[#65617A] mb-6">
                Upcoming creations from our ongoing student cohorts will appear here soon.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#35309B] text-white text-xs font-bold"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00]" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Bottom Back Home Link */}
          <div className="mt-14 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#35309B] hover:underline"
            >
              <span>← Back to Kreators Lab Homepage</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(name) => handleOpenInquiry({ program: `Project Inquiry: ${name}` })}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        prefilled={inquiryPrefill}
      />
    </div>
  );
}
