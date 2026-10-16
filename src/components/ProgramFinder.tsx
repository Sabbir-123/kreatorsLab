"use client";

import React, { useState } from "react";
import { Sparkles, Search, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/data/siteContent";
import { trackEvent } from "@/lib/analytics";

interface ProgramFinderProps {
  onOpenInquiry?: (prefilled?: Record<string, string>) => void;
}

export function ProgramFinder({ onOpenInquiry }: ProgramFinderProps) {
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  // Match only against actual program data
  const matchingPrograms = PROGRAMS.filter((prog) => {
    if (selectedGrade === "elementary" && prog.id !== "elementary" && prog.id !== "camps") return false;
    if (selectedGrade === "middle" && prog.id !== "middle-school" && prog.id !== "camps") return false;
    if (selectedFormat === "camps" && prog.id !== "camps") return false;
    if (selectedFormat === "homeschool" && prog.id !== "homeschool-virtual") return false;
    return true;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentEmail || !parentName) return;
    trackEvent("parent_inquiry_submit", {
      category: "program_finder_quick",
      grade_level: selectedGrade,
      program_name: selectedInterest,
    });
    setSubmittedInquiry(true);
  };

  return (
    <section id="program-finder" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F4FF] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E8E6F1]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Clean Selectors */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Child&apos;s Next Creative Step</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18152B] tracking-tight">
                Not Sure Where to Begin?
              </h2>

              <p className="text-base sm:text-lg text-[#65617A] leading-relaxed">
                Every child arrives with different interests, skills, and questions. Tell us a little about your child, and we&apos;ll help you explore the available options.
                Whether they&apos;re trying creative technology for the first time or looking for a new challenge, the right starting point should feel welcoming and engaging.
              </p>

              {/* Selectors */}
              <div className="space-y-5 pt-2">
                {/* 1. Grade */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#18152B] mb-2">
                    Child&apos;s Grade Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "all", label: "All Grades" },
                      { id: "elementary", label: "Grades K–5" },
                      { id: "middle", label: "Grades 6–8" },
                      { id: "camps", label: "Break Camps" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedGrade(opt.id)}
                        className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                          selectedGrade === opt.id
                            ? "bg-[#35309B] text-white border-[#35309B]"
                            : "bg-white text-[#18152B] border-[#E8E6F1] hover:border-[#35309B]/40"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Area of Interest */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#18152B] mb-2">
                    Area of Creative Interest
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "all", label: "Open to Explore" },
                      { id: "games", label: "Game Design" },
                      { id: "stories", label: "Interactive Stories" },
                      { id: "ai", label: "AI & Logic Systems" },
                      { id: "hands-on", label: "Creative Making" },
                      { id: "beginner", label: "Curious Beginner" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedInterest(opt.id)}
                        className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                          selectedInterest === opt.id
                            ? "bg-[#35309B] text-white border-[#35309B]"
                            : "bg-white text-[#18152B] border-[#E8E6F1] hover:border-[#35309B]/40"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Preferred Learning Format */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#18152B] mb-2">
                    Preferred Learning Format
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "all", label: "Any Format" },
                      { id: "studio", label: "In-Person Studio" },
                      { id: "camps", label: "Camp Week" },
                      { id: "homeschool", label: "Homeschool / Online" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedFormat(opt.id)}
                        className={`px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                          selectedFormat === opt.id
                            ? "bg-[#35309B] text-white border-[#35309B]"
                            : "bg-white text-[#18152B] border-[#E8E6F1] hover:border-[#35309B]/40"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    onOpenInquiry?.({
                      grade: selectedGrade,
                      interest: selectedInterest,
                      format: selectedFormat,
                    })
                  }
                  className="inline-flex items-center gap-2 bg-[#35309B] hover:bg-[#302A91] text-white font-bold px-7 py-3.5 rounded-full shadow-xs transition-all hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Your Child&apos;s Program</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenInquiry?.()}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#18152B] font-semibold px-6 py-3.5 rounded-full border border-[#E8E6F1] shadow-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#35309B]" />
                  <span>Ask Us a Question</span>
                </button>
              </div>
            </div>

            {/* Right Column: Actual Matching Programs Preview & Inquiry */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E6F1]">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E6F1]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#35309B]">
                  Matching Programs ({matchingPrograms.length})
                </span>
                <span className="text-xs text-[#65617A]">Lake Travis / Austin</span>
              </div>

              <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {matchingPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 rounded-xl border border-[#E8E6F1] bg-[#F5F4FF]/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#35309B]">{prog.gradeSpan}</span>
                        <span className="text-[11px] font-semibold text-[#18152B] bg-white px-2 py-0.5 rounded border border-[#E8E6F1]">
                          {prog.badge || "Studio Session"}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#18152B]">{prog.title}</h4>
                      <p className="text-xs text-[#65617A] mt-1 line-clamp-2">{prog.description}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#E8E6F1] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#35309B]">
                        {prog.status}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenInquiry?.({ program: prog.title, grade: prog.gradeSpan })
                        }
                        className="text-xs font-bold text-[#35309B] hover:text-[#302A91] flex items-center gap-1"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Parent Inquiry Form (Minimizes child data collection) */}
              <div className="mt-5 pt-4 border-t border-[#E8E6F1]">
                {submittedInquiry ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 space-y-1">
                    <p className="font-bold flex items-center justify-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" /> Inquiry Received
                    </p>
                    <p>We will email you the confirmed cohort options shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                    <p className="text-xs font-bold text-[#18152B]">
                      Request cohort schedules directly from an advisor:
                    </p>
                    <input
                      type="text"
                      placeholder="Parent's Name"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E6F1] focus:outline-none focus:border-[#35309B]"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Parent's Email Address"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E6F1] focus:outline-none focus:border-[#35309B]"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-[#18152B] hover:bg-[#35309B] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Send Parent Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
