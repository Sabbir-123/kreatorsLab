"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, HelpCircle, ArrowRight } from "lucide-react";

interface PhilosophySectionProps {
  onLearnMore?: () => void;
}

export function PhilosophySection({ onLearnMore }: PhilosophySectionProps) {
  const reflectiveQuestions = [
    "What am I trying to make?",
    "Why does this idea matter to me?",
    "Is this AI-generated answer correct?",
    "How could I make this better?",
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-hero-gradient text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFFF00] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Brand Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              AI Is the Tool.{" "}
              <span className="text-[#DFFF00]">Your Child Is the Creator.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#EEECFF]/95 leading-relaxed">
              <p className="text-lg sm:text-xl font-medium text-white">
                AI can do remarkable things.
              </p>

              <p>
                But it shouldn&apos;t do all the thinking.
              </p>

              <p>
                At Kreators Lab, students learn to guide technology with their own ideas, decisions, and curiosity.
              </p>

              {/* 4 Reflective Student Questions */}
              <div className="my-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <p className="text-xs font-bold uppercase tracking-wider text-[#DFFF00] mb-3">
                  We encourage students to ask:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {reflectiveQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <HelpCircle className="w-4 h-4 text-[#DFFF00] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-white">{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The technology may change.
              </p>
              <p className="font-semibold text-white">
                The ability to think creatively, ask thoughtful questions, and solve problems will always matter.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] font-extrabold text-base px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00]/50"
              >
                <span>Learn About Our Philosophy</span>
                <ArrowRight className="w-4 h-4 text-[#18152B]" />
              </button>
            </div>
          </div>

          {/* Right Column: One Genuine Photograph */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-[#302A91] aspect-[4/5] group">
                <Image
                  src="/images/students/collaborative-learning.jpg"
                  alt="Students engaged in collaborative thinking and creative technology exploration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#18152B]/90 backdrop-blur-md border border-white/20">
                  <p className="text-xs font-bold text-[#DFFF00] uppercase tracking-wider">
                    Human Agency First
                  </p>
                  <p className="text-xs text-white mt-1">
                    Equipping young minds to make decisions, not just click generate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
