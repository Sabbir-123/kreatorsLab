"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { FAQS } from "@/data/siteContent";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("coding-experience");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const midpoint = Math.ceil(FAQS.length / 2);
  const leftColumnFaqs = FAQS.slice(0, midpoint);
  const rightColumnFaqs = FAQS.slice(midpoint);

  const renderFaqItem = (faq: (typeof FAQS)[0]) => {
    const isOpen = openId === faq.id;
    return (
      <div
        key={faq.id}
        className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
          isOpen
            ? "border-[#35309B]/40 bg-white shadow-xs"
            : "border-[#E8E6F1] bg-white hover:border-[#35309B]/25"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B] min-h-[56px]"
          aria-expanded={isOpen}
        >
          <span className="text-base sm:text-lg font-bold text-[#18152B]">
            {faq.question}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[#35309B] shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "text-[#65617A]"
            }`}
          />
        </button>

        {isOpen && (
          <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#65617A] leading-relaxed border-t border-[#E8E6F1]/70 animate-in fade-in duration-150">
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F5F4FF] border-b border-[#E8E6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight">
            Good Questions Deserve Clear Answers.
          </h2>
        </div>

        {/* Minimal Accordion: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          <div className="space-y-4">{leftColumnFaqs.map(renderFaqItem)}</div>
          <div className="space-y-4">{rightColumnFaqs.map(renderFaqItem)}</div>
        </div>
      </div>
    </section>
  );
}
