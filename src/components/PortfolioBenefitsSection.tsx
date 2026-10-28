"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, FolderGit2, Compass, Award, CheckCircle2 } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/siteContent";

export function PortfolioBenefitsSection() {
  const portfolioPillars = [
    {
      icon: FolderGit2,
      title: "Tangible Proof of Originality",
      description:
        "Unlike canned classroom worksheets or copy-pasted prompts, original games, apps, and simulations demonstrate genuine creator initiative and personal voice.",
    },
    {
      icon: Compass,
      title: "Technical Articulation & Voice",
      description:
        "Students learn to articulate their design choices, computational logic, and how they debugged obstacles—skills that shine in admissions essays and interviews.",
    },
    {
      icon: Award,
      title: "Cumulative Growth Across K–12",
      description:
        "A living digital body of work that documents technical growth, from early elementary creative experiments to advanced middle and high school system architecture.",
    },
  ];

  return (
    <section id="portfolio-benefits" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E6F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#35309B]/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Academic &amp; Creative Growth • Student Portfolios</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Building Portfolios That Stand Out.
          </h2>

          {/* Client-provided exact statement */}
          <div className="mt-6 p-6 sm:p-7 rounded-3xl bg-[#F6F4FD] border-2 border-[#35309B]/20 shadow-xs relative">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#18152B] leading-relaxed">
              &ldquo;Students build a portfolio of original projects that showcases their creativity, critical thinking, and technical skills—helping strengthen future college and university applications.&rdquo;
            </p>
          </div>
        </div>

        {/* Content Layout: Pillars & Real Project Portfolio Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (7 cols): 3 Portfolio Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {portfolioPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F9F8FD] border border-[#EBE7F6] hover:border-[#35309B]/30 hover:bg-white transition-all duration-200 flex items-start gap-4 shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#35309B] text-[#DFFF00] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#18152B]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#55506E] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <p className="text-xs text-[#65617A] italic">
                * Real projects demonstrate student initiative and problem-solving to support future academic applications without guaranteeing admission or scholarship outcomes.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Authentic Student Portfolio Card Stack */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="p-6 rounded-3xl bg-[#18152B] text-white border-2 border-[#35309B]/40 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#DFFF00]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Verified Student Portfolio
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#DFFF00] bg-white/10 px-2.5 py-0.5 rounded-full">
                    K–12 Archive
                  </span>
                </div>

                {/* Stack of real student projects */}
                <div className="mt-4 space-y-3">
                  {FEATURED_PROJECTS.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-black">
                        <Image
                          src={item.thumbnail}
                          alt={`${item.name} thumbnail`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-[#DFFF00] font-semibold shrink-0">
                            {item.grade}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#EEECFF]/75 truncate mt-0.5">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DFFF00]" />
                    <span>Independent Code &amp; Visual Logic</span>
                  </span>
                  <span className="font-semibold text-[#DFFF00]">Ready to Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
