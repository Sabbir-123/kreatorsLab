"use client";

import React from "react";
import Image from "next/image";

interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  shapeClass: string;
}

const HERO_PHOTOS: PhotoItem[] = [
  // 1. Tall vertical portrait (Student sketching ideas on paper with markers)
  {
    id: "hp-1",
    src: "/images/hero/sketching-ideas.jpg",
    alt: "Young student sketching logic and game ideas on paper",
    shapeClass: "w-[190px] sm:w-[230px] md:w-[250px] aspect-[3/4.2]",
  },
  // 2. Landscape rectangle (Two boys at laptop at camp table)
  {
    id: "hp-2",
    src: "/images/founder/camp.JPG",
    alt: "Students collaborating on laptop at Kreators Lab camp",
    shapeClass: "w-[280px] sm:w-[340px] md:w-[380px] aspect-[4/3]",
  },
  // 3. Vertical portrait (Group of smiling kids with mentor)
  {
    id: "hp-3",
    src: "/images/founder/actually_knows.JPG",
    alt: "Cohort of students smiling together with mentor in studio",
    shapeClass: "w-[210px] sm:w-[250px] md:w-[270px] aspect-[3/4]",
  },
  // 4. Wide landscape (Student presenting project on big TV screen)
  {
    id: "hp-4",
    src: "/images/hero/presenting-project.jpg",
    alt: "Student presenting his working game on big screen at Friday Demo",
    shapeClass: "w-[300px] sm:w-[380px] md:w-[420px] aspect-[16/11]",
  },
  // 5. Vertical portrait (Kids collaborating around table)
  {
    id: "hp-5",
    src: "/images/founder/gallary8.JPG",
    alt: "Students actively discussing logic around lab table",
    shapeClass: "w-[190px] sm:w-[230px] md:w-[250px] aspect-[3/4.1]",
  },
  // 6. Balanced square (Pair programming in lab)
  {
    id: "hp-6",
    src: "/images/students/collaborative-learning.jpg",
    alt: "Pair programming and debugging code in lab",
    shapeClass: "w-[240px] sm:w-[280px] md:w-[310px] aspect-[1/1]",
  },
  // 7. Medium landscape (Student planning at laptop)
  {
    id: "hp-7",
    src: "/images/students/planning-laptop.jpg",
    alt: "Student testing interactive logic on laptop",
    shapeClass: "w-[270px] sm:w-[320px] md:w-[360px] aspect-[16/11]",
  },
  // 8. Vertical portrait (Mentor guidance in studio)
  {
    id: "hp-8",
    src: "/images/founder/gallary2.JPG",
    alt: "Mentor providing personalized guidance to student",
    shapeClass: "w-[210px] sm:w-[250px] md:w-[270px] aspect-[3/4]",
  },
];

export function HeroPhotoStrip() {
  return (
    <section
      aria-label="Studio Moments and Classroom Experiences"
      className="relative w-full py-8 sm:py-12 md:py-14 bg-gradient-to-b from-[#281F72]/5 via-white to-[#FAF9FE] overflow-hidden"
    >
      {/* Soft Left & Right Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

      {/* Horizontal Continuous Marquee Strip */}
      <div className="marquee-row relative flex items-center overflow-hidden py-2">
        <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 shrink-0">
          {[...HERO_PHOTOS, ...HERO_PHOTOS].map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              className={`relative shrink-0 ${photo.shapeClass} rounded-2xl sm:rounded-3xl overflow-hidden bg-[#18123B] border-2 border-white shadow-[0_8px_24px_rgba(35,28,84,0.08)] hover:shadow-[0_16px_40px_rgba(71,61,234,0.18)] transition-all duration-500 ease-out hover:scale-[1.03] hover:z-10 group cursor-pointer`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                sizes="(max-width: 768px) 250px, 420px"
              />
              {/* Very subtle resting scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              {/* Hover shine */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

