"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Quote,
  MapPin,
  CheckCircle,
  Play,
  Star,
  Video,
} from "lucide-react";

interface TestimonialsSectionProps {
  onWatchVideo?: () => void;
}

export function TestimonialsSection({ onWatchVideo }: TestimonialsSectionProps) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F6F5FD] border-b border-[#E8E6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#473DEA] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Parent Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Hear From the Families Behind Our Young Creators.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#65617A] leading-relaxed">
            What does a meaningful creative learning experience look like from a parent&apos;s perspective?
            Explore authentic stories from families who have experienced Kreators Lab.
          </p>
        </div>

        {/* 3 Diverse Testimonial Cards: 1 with Real Photo, 1 with Video, 1 with Just Texts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          
          {/* CARD 1: REAL PARENTS PICTURE */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E8E6F1] hover:border-[#473DEA]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Real Parent Photo Frame */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 bg-[#18152B] border border-[#F0EEF8]">
                <Image
                  src="/images/parents/sarah-parent.jpg"
                  alt="Sarah M. and her daughter exploring creative technology at Kreators Lab"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#18152B] shadow-xs flex items-center gap-1.5 border border-white/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Real Family Story</span>
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-xs font-bold drop-shadow-sm">Sarah &amp; Maya (3rd Grade)</p>
                  <p className="text-[10px] text-white/80">Lakeway, TX</p>
                </div>
              </div>

              {/* Quote */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EEECFF] flex items-center justify-center text-[#473DEA] shrink-0 mt-0.5">
                  <Quote className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm sm:text-base text-[#18152B] font-medium leading-relaxed italic">
                  &ldquo;My daughter came home on day one with a notebook filled with drawings and said: &apos;Mom, I&apos;m designing my own game!&apos; Watching her actually build it and explain how it worked on Friday was breathtaking.&rdquo;
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="mt-6 pt-5 border-t border-[#F0EEF8] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#18152B]">Sarah M.</h4>
                <p className="text-xs text-[#473DEA] font-semibold">3rd Grade Parent</p>
                <div className="flex items-center gap-1 text-[11px] text-[#65617A] mt-0.5">
                  <MapPin className="w-3 h-3 text-[#473DEA]" />
                  <span>Lakeway, TX</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Verified Parent
              </span>
            </div>
          </div>

          {/* CARD 2: VIDEO TESTIMONIAL */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border-2 border-[#473DEA]/30 hover:border-[#473DEA] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            {/* Top Accent Gradient Ribbon */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#473DEA] via-[#7C3AED] to-[#DFFF00]" />

            <div>
              {/* Video Player / Preview Frame */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 bg-[#18152B] border border-[#F0EEF8]">
                {isPlayingInline ? (
                  <video
                    src="/videos/kreators-lab-studio-loop.mp4"
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src="/videos/week-at-kreatorslab-poster.jpg"
                      alt="Parent video testimonial with David K."
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                    {/* Top Duration Badge */}
                    <div className="absolute top-3 left-3 bg-[#473DEA] text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      <span>Video Review • 1:12</span>
                    </div>

                    {/* Center Glowing Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (onWatchVideo) {
                            onWatchVideo();
                          } else {
                            setIsPlayingInline(true);
                          }
                        }}
                        className="w-14 h-14 rounded-full bg-[#DFFF00] text-[#18152B] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:ring-4 group-hover:ring-white/40"
                        aria-label="Play parent video testimonial"
                      >
                        <Play className="w-6 h-6 fill-current ml-0.5 text-[#18152B]" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 text-center">
                      <p className="text-white text-xs font-bold drop-shadow-sm">
                        Tap to Play Video Review
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Quote Snippet */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#473DEA] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <p className="text-sm sm:text-base text-[#18152B] font-medium leading-relaxed italic">
                  &ldquo;What stood out most wasn&apos;t just the AI tools, but how the instructors taught them to question what the computer suggested. My son learned to be critical, thoughtful, and creative.&rdquo;
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="mt-6 pt-5 border-t border-[#F0EEF8] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#18152B]">David K.</h4>
                <p className="text-xs text-[#473DEA] font-semibold">7th Grade Parent</p>
                <div className="flex items-center gap-1 text-[11px] text-[#65617A] mt-0.5">
                  <MapPin className="w-3 h-3 text-[#473DEA]" />
                  <span>Westlake / Austin, TX</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Verified Video
              </span>
            </div>
          </div>

          {/* CARD 3: JUST TEXTS */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E8E6F1] hover:border-[#473DEA]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Top Meta Header: Large Quotation Icon + Star Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEECFF] flex items-center justify-center text-[#473DEA]">
                  <Quote className="w-6 h-6 fill-current" />
                </div>

                <div className="flex items-center gap-1 bg-[#FAF9FE] px-3 py-1.5 rounded-full border border-[#EDE8F7]">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#18152B] ml-1">5.0</span>
                </div>
              </div>

              {/* Tag / Category Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FB] text-[#473DEA] text-xs font-bold border border-[#EDE8F7] mb-4">
                <span>📚 Homeschool Perspective</span>
              </div>

              {/* Full Text Quote */}
              <p className="text-base sm:text-lg text-[#18152B] font-semibold leading-relaxed">
                &ldquo;Kreators Lab gave our homeschool curriculum the hands-on tech spark we were missing.{" "}
                <span className="text-[#473DEA] underline decoration-[#473DEA]/30 underline-offset-4 font-bold">
                  It feels like an actual studio for young creators
                </span>
                , not another boring coding tutorial.&rdquo;
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#65617A] leading-relaxed">
                The focus on asking questions, planning on paper, and celebrating Friday project completions made a measurable difference in our child&apos;s independent confidence.
              </p>
            </div>

            {/* Author Footer */}
            <div className="mt-6 pt-5 border-t border-[#F0EEF8] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#18152B]">Elena R.</h4>
                <p className="text-xs text-[#473DEA] font-semibold">5th Grade Parent</p>
                <div className="flex items-center gap-1 text-[11px] text-[#65617A] mt-0.5">
                  <MapPin className="w-3 h-3 text-[#473DEA]" />
                  <span>Bee Cave, TX</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Verified Parent
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
