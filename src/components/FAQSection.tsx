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
            ? "border-sky-300 ring-1 ring-sky-200 bg-white shadow-xs"
            : "border-sky-100/90 bg-white hover:border-sky-300"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 min-h-[56px]"
          aria-expanded={isOpen}
        >
          <span className="text-base sm:text-lg font-bold text-slate-900">
            {faq.question}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "text-slate-400"
            }`}
          />
        </button>

        {isOpen && (
          <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-sky-100/70 animate-in fade-in duration-150">
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-b from-white via-sky-50/25 to-white border-b border-sky-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
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
