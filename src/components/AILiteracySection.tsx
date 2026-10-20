"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Brain, Database, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

interface AILiteracySectionProps {
  onLearnMore?: () => void;
}

export function AILiteracySection({ onLearnMore }: AILiteracySectionProps) {
  const literacyPillars = [
    {
      icon: Cpu,
      title: "Behind the Tools",
      description:
        "Students demystify the 'black box'—learning what happens behind the interface, how algorithms process commands, and why computers follow logic.",
    },
    {
      icon: Brain,
      title: "How AI Generates Outputs",
      description:
        "Understanding prediction, pattern matching, and prompt engineering—learning how models synthesize information and how to guide outputs with precision.",
    },
    {
      icon: Database,
      title: "The Role of Data & Models",
      description:
        "Exploring how training data shapes behavior, capabilities, limitations, and bias—building fundamental awareness of how machine learning models are trained.",
    },
    {
      icon: ShieldCheck,
      title: "Responsible & Safe AI Use",
      description:
        "Instilling digital ethics, privacy protection, and critical verification—teaching students to question hallucinations rather than accepting machine answers blindly.",
    },
  ];

  return (
    <section id="ai-literacy" className="py-20 md:py-28 bg-[#FAF9FE] border-b border-[#E8E6F1] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -right-36 w-96 h-96 rounded-full bg-[#473DEA]/8 blur-3xl" />
        <div className="absolute bottom-1/3 -left-36 w-96 h-96 rounded-full bg-[#35309B]/8 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#35309B]/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Distinct Benefit • AI Literacy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Understanding AI Beyond Just the Prompt.
          </h2>

          {/* Client's exact text callout */}
          <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#35309B]/25 shadow-[0_10px_35px_rgba(53,48,155,0.08)] text-left relative">
            <div className="absolute top-0 left-8 -translate-y-1/2 px-3 py-1 rounded-full bg-[#35309B] text-[#DFFF00] text-[11px] font-black uppercase tracking-wider shadow-xs">
              Our Educational Approach
            </div>

            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#18152B] leading-relaxed">
              &ldquo;Our students do not just write stories with AI, create images with AI, or ask and answer questions with AI. They go much further. They understand how AI works, what happens behind the tools, how AI generates its outputs, the role of data and models, and responsible AI use.&rdquo;
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid with Visual Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 4 Pillar Cards (col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {literacyPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E6F1] shadow-xs hover:shadow-md hover:border-[#35309B]/35 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#F0EEFB] text-[#35309B] group-hover:bg-[#35309B] group-hover:text-[#DFFF00] transition-colors flex items-center justify-center mb-3.5 shadow-2xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#18152B] tracking-tight group-hover:text-[#35309B] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#55506E] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Genuine Student Visual (col-span-5) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#302A91] aspect-[4/5] group">
                <Image
                  src="/images/students/collaborative-learning.jpg"
                  alt="Students collaborating and analyzing AI model outputs in the studio"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#18152B]/90 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <div className="flex items-center gap-1.5 mb-1 text-[#DFFF00] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real AI Literacy in Practice</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-normal">
                    Students learn to test outputs, verify facts, and understand the computer systems shaping their digital world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Helper */}
        {onLearnMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#35309B] hover:text-[#473DEA] transition-colors"
            >
              <span>Learn more about our curriculum and safety standards</span>
              <ArrowRight className="w-4 h-4 text-[#35309B]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
