"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { MENTORS } from "@/data/siteContent";

interface MentorsSectionProps {
  onMeetTeam?: () => void;
}

export function MentorsSection({ onMeetTeam }: MentorsSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Guidance. Real Encouragement.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Great Ideas Grow With the Right Guidance.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#65617A] leading-relaxed">
            Children need more than access to powerful technology. They need people who listen to their ideas,
            encourage thoughtful questions, and help them work through challenges.
            Our approach puts student curiosity and supportive guidance at the center of the learning experience.
          </p>
        </div>

        {/* Mentor Profiles (Verified Educational Backgrounds) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-[#F5F4FF] rounded-3xl p-6 sm:p-7 border border-[#E8E6F1] flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 bg-[#35309B]">
                  <Image
                    src={mentor.avatarPlaceholder}
                    alt={`${mentor.name} — ${mentor.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {mentor.isPlaceholder && (
                    <div className="absolute bottom-2.5 right-2.5 bg-[#18152B]/85 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded border border-white/20">
                      Educator Profile Slot
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#35309B] mb-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{mentor.role}</span>
                </div>

                <h3 className="text-xl font-bold text-[#18152B]">
                  {mentor.name}
                </h3>

                <p className="text-xs font-semibold text-[#65617A] mt-1 mb-3">
                  {mentor.qualification}
                </p>

                <p className="text-sm text-[#65617A] leading-relaxed">
                  {mentor.bio}
                </p>
              </div>

              {/* Safety & Vetting Badge */}
              <div className="mt-6 pt-4 border-t border-[#E8E6F1] flex items-center justify-between text-xs text-[#18152B] font-medium">
                <span className="flex items-center gap-1.5 text-[#35309B]">
                  <ShieldCheck className="w-4 h-4 text-[#35309B]" />
                  Background-Checked &amp; Trained
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onMeetTeam}
            className="inline-flex items-center justify-center gap-2 bg-[#F5F4FF] hover:bg-[#EEECFF] text-[#35309B] text-base font-bold px-8 py-3.5 rounded-full border border-[#E8E6F1] shadow-xs transition-all hover:scale-[1.02]"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
