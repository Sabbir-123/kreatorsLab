"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Check } from "lucide-react";

export function WhyKreatorsLab() {
  const reflectiveQuestions = [
    "Can they spot a mistake?",
    "Can they improve an idea?",
    "Can they explain why something works?",
    "Can they create something that reflects their own imagination?",
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E8E6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Different Kind of Technology Learning</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
              Kids Don&apos;t Need More Screen Time.{" "}
              <span className="text-[#35309B]">They Need More Creative Time.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#65617A] leading-relaxed">
              <p>
                Today&apos;s children can ask AI to write a story, create an image, or answer a question in seconds.
              </p>

              <p>
                But being able to get an answer isn&apos;t the same as knowing what to do with it.
              </p>

              {/* 4 Reflective Questions */}
              <div className="my-6 p-6 bg-[#F5F4FF] rounded-2xl border border-[#E8E6F1] space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#35309B]">
                  These are the questions that matter to us:
                </p>
                <ul className="space-y-2.5">
                  {reflectiveQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#18152B] font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#35309B] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-semibold text-[#18152B]">
                At Kreators Lab, we want kids to do more than use technology.
              </p>
              <p className="font-semibold text-[#35309B]">
                We want them to think, question, experiment, and create with it.
              </p>
            </div>
          </div>

          {/* Real Photo: Paper-first planning beside laptop */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#302A91] aspect-[4/5] group">
                <Image
                  src="/images/students/planning-laptop.jpg"
                  alt="Student sketching creative project plans on paper beside a laptop"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-white/60">
                  <p className="text-xs font-bold text-[#35309B] uppercase tracking-wider">
                    Paper First • Technology Second
                  </p>
                  <p className="text-xs text-[#18152B] mt-1 font-medium">
                    Critical questioning and human imagination guide every digital tool.
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
