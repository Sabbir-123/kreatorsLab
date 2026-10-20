"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, Brain, Bug, Compass } from "lucide-react";

export function WhyKreatorsLab() {
  const pillars = [
    {
      icon: Compass,
      title: "Independent Decisions & Ownership",
      description:
        "Students bring their own original ideas rather than following step-by-step copycat tutorials. They make every creative and architectural choice themselves.",
    },
    {
      icon: Bug,
      title: "Active Debugging & Resilience",
      description:
        "When things break or AI hallucinated, students learn to investigate what went wrong, test hypotheses, and solve the puzzle through iterative reasoning.",
    },
    {
      icon: Brain,
      title: "Critical Thinking & Real Problem-Solving",
      description:
        "Students learn to question computer suggestions, evaluate whether an answer is accurate, and resolve real-world design challenges with purpose.",
    },
  ];

  return (
    <section id="critical-thinking" className="py-20 md:py-28 bg-white border-b border-[#E8E6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Critical Thinking &amp; Ownership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
              It&apos;s Not Just About What They Build.{" "}
              <span className="text-[#35309B]">It&apos;s About How They Think.</span>
            </h2>

            {/* Client-provided supporting copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[#35309B] font-semibold leading-relaxed">
              At Kreators Lab, kids bring their own ideas and explore the decision-making process, debug their work, and resolve the challenges they face. They use AI to bring their vision to life.
            </p>

            <p className="text-sm sm:text-base text-[#65617A] leading-relaxed">
              Today&apos;s children can generate an answer, an image, or a block of code in seconds.
              But true creative confidence doesn&apos;t come from clicking &ldquo;generate.&rdquo; It comes from knowing what you want to create, understanding how it functions, and having the persistence to make it work.
            </p>

            {/* 3 Core Thinking Pillars */}
            <div className="pt-2 space-y-3.5">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8F7FD] border border-[#EBE7F6] flex items-start gap-3.5 transition-all hover:border-[#D5CBF8] hover:bg-[#F4F1FC]"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#35309B] text-[#DFFF00] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#18152B]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#65617A] mt-1 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real Photo: Paper-first planning beside laptop */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#302A91] aspect-[4/5] group">
                <Image
                  src="/images/students/planning-laptop.jpg"
                  alt="Student sketching creative project plans on paper beside a laptop"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#35309B]" />
                    <p className="text-xs font-bold text-[#35309B] uppercase tracking-wider">
                      Paper First • Technology Second
                    </p>
                  </div>
                  <p className="text-xs text-[#18152B] font-medium leading-relaxed">
                    Independent brainstorming and decision-making empower young minds before touching any digital tools.
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
