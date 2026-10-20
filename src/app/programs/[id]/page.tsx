import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Users,
  ShieldCheck,
  Laptop,
} from "lucide-react";
import {
  AFTER_SCHOOL_PROGRAMS,
  DAY_CAMPS,
  SectionProgramItem,
} from "@/data/siteContent";
import { EnrichmentJourney12Week } from "@/components/EnrichmentJourney12Week";
import { CampJourneyInteractive } from "@/components/CampJourneyInteractive";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgramDetailClient } from "./ProgramDetailClient";

interface ProgramPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const allPrograms = [...AFTER_SCHOOL_PROGRAMS, ...DAY_CAMPS];
  return allPrograms.map((p) => ({
    id: p.id,
  }));
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { id } = await params;
  const allPrograms: SectionProgramItem[] = [
    ...AFTER_SCHOOL_PROGRAMS,
    ...DAY_CAMPS,
  ];

  const program = allPrograms.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  const isAfterSchool = program.category === "after-school";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <Header />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#programs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#35309B] hover:text-[#473DEA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programs</span>
          </Link>
        </div>

        {/* Program Hero Section */}
        <section className="bg-gradient-to-b from-[#FAF9FE] to-white pb-14 border-b border-[#E8E6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Metadata, Title, Pricing, Actions */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35309B] text-white text-xs font-extrabold uppercase tracking-wider">
                    {isAfterSchool ? "12-Week Enrichment" : "School Break Camp"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EFFC] text-[#35309B] text-xs font-bold border border-[#DED7FD]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{program.dateRange}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18152B] tracking-tight leading-tight">
                  {program.title}
                </h1>

                <p className="text-base sm:text-lg text-[#55506E] leading-relaxed">
                  {program.description ||
                    "An engaging hands-on creative technology program where students think creatively, explore AI tools safely, and build original digital creations."}
                </p>

                {/* Schedule & Cohort Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-white border border-[#E8E6F1] shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-[#65617A]">Schedule</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#18152B] mt-0.5">{program.scheduleDays}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E8E6F1] shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-[#65617A]">Time</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#18152B] mt-0.5">{program.scheduleTime.replace("Time: ", "")}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E8E6F1] shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-[#65617A]">Duration</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#18152B] mt-0.5">{program.classCount}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E8E6F1] shadow-2xs">
                    <p className="text-[10px] uppercase font-bold text-[#65617A]">Eligible</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#18152B] mt-0.5">{program.grades.replace("Grades: ", "")}</p>
                  </div>
                </div>

                {/* Pricing & CTA Client Interaction */}
                <ProgramDetailClient program={program} />
              </div>

              {/* Right Column: Hero Visual Frame */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#18152B] border-4 border-white shadow-2xl">
                  <Image
                    src={program.image}
                    alt={`${program.title} hands-on studio session`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#18152B]/90 backdrop-blur-md border border-white/20 text-white">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#DFFF00]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Austin &amp; Lake Travis Cohort</span>
                    </div>
                    <p className="text-xs text-white/90 mt-0.5">
                      Small mentor ratios with hands-on personalized guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Interactive Learning Journey */}
        {isAfterSchool ? (
          <EnrichmentJourney12Week program={program} />
        ) : (
          <CampJourneyInteractive program={program} />
        )}

        {/* Program Standards & Logistics Grid */}
        <section className="py-16 bg-white border-b border-[#E8E6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18152B]">
                Program Essentials &amp; Learning Standards
              </h3>
              <p className="mt-2 text-sm text-[#55506E]">
                What families need to know before joining this cohort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-[#FAF9FE] border border-[#E8E6F1] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#35309B] text-[#DFFF00] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#18152B]">Small Ratios</h4>
                <p className="text-xs text-[#55506E] leading-relaxed">
                  Low student-to-mentor ratios ensuring every child receives thoughtful guidance and feedback.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9FE] border border-[#E8E6F1] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#35309B] text-[#DFFF00] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#18152B]">Safe AI Sandbox</h4>
                <p className="text-xs text-[#55506E] leading-relaxed">
                  Curated, child-safe AI tools and closed environments with privacy protection and human supervision.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9FE] border border-[#E8E6F1] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#35309B] text-[#DFFF00] flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#18152B]">Device Provided</h4>
                <p className="text-xs text-[#55506E] leading-relaxed">
                  Laptops and creative tools are provided in studio. For virtual cohorts, any modern browser works.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9FE] border border-[#E8E6F1] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#35309B] text-[#DFFF00] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#18152B]">Austin / Lake Travis</h4>
                <p className="text-xs text-[#55506E] leading-relaxed">
                  Convenient local studios serving families across Lakeway, Bee Cave, Westlake, and Austin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
