"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionProgramItem } from "@/data/siteContent";
import { InquiryModal } from "@/components/InquiryModal";
import { trackEvent } from "@/lib/analytics";

interface ProgramDetailClientProps {
  program: SectionProgramItem;
}

export function ProgramDetailClient({ program }: ProgramDetailClientProps) {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const handleEnrollClick = () => {
    trackEvent("cta_click", {
      label: "Enroll in This Cohort",
      program_name: program.title,
      grade_level: program.grades,
    });
    setIsInquiryModalOpen(true);
  };

  return (
    <>
      {/* Dual Pricing Boxes & Primary CTA */}
      <div className="pt-2">
        <div className="grid grid-cols-2 gap-3 max-w-md mb-4">
          {/* Regular Price Box */}
          <div className="bg-[#F8F7FD] rounded-2xl p-3.5 text-center border border-[#EFEBF8]">
            <div className="text-2xl sm:text-3xl font-black text-[#18152B] tracking-tight">
              {program.regularPrice}
            </div>
            <div className="text-[11px] font-medium text-[#736E8F] mt-0.5">
              Regular Tuition
            </div>
          </div>

          {/* Limited-Time Price Box with Savings Badge */}
          <div className="bg-white rounded-2xl p-3.5 text-center border-2 border-[#35309B] relative shadow-xs">
            <div className="absolute -top-2.5 -right-2 bg-[#7C3AED] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs tracking-tight">
              {program.savingsBadge}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#35309B] tracking-tight">
              {program.promoPrice}
            </div>
            <div className="text-[11px] font-semibold text-[#35309B] mt-0.5">
              Limited-Time Tuition
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleEnrollClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#5438DC] hover:bg-[#4329C7] text-white text-base font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#5438DC]/50"
        >
          <span>Enroll in This Cohort</span>
          <ArrowRight className="w-5 h-5 text-[#DFFF00]" />
        </button>
      </div>

      {/* Inquiry & Registration Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        prefilled={{
          program: program.title,
          grade: program.grades.replace("Grades: ", ""),
        }}
      />
    </>
  );
}
