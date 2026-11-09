"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilled?: Record<string, string>;
}

export function InquiryModal({ isOpen, onClose, prefilled }: InquiryModalProps) {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState(() => prefilled?.grade || "Grades K–5");
  const [locationArea, setLocationArea] = useState("Lake Travis / Lakeway");
  const [interest, setInterest] = useState(() => prefilled?.program || "Hands-on AI & Creative Technology");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      trackEvent("parent_inquiry_start", {
        program_name: interest,
        grade_level: grade,
      });
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, interest, grade]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !parentName) return;

    trackEvent("parent_inquiry_submit", {
      program_name: interest,
      grade_level: grade,
      location: locationArea,
    });

    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-sky-100 bg-sky-50/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Program Inquiry &amp; Family Consultation</span>
            </div>
            <h3 id="inquiry-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Explore Kreators Lab for Your Child
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-700 hover:bg-sky-100/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close inquiry dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                Thank You, {parentName}!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                We have received your inquiry. A member of our education team will reach out to{" "}
                <span className="font-semibold text-slate-900">{email}</span> within 24 hours with confirmed program details, local cohort schedules, and studio visit options in {locationArea}.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] hover:opacity-95 text-white font-bold rounded-full text-sm shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Fill out the form below to receive schedule availability and tuition details for Lake Travis, Lakeway, Bee Cave, Westlake, and greater Austin cohorts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="parent-name" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Parent / Guardian Name *
                  </label>
                  <input
                    id="parent-name"
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Rachel Miller"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  />
                </div>

                <div>
                  <label htmlFor="parent-email" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="parent-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rachel@example.com"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="parent-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    id="parent-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(512) 555-0199"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  />
                </div>

                <div>
                  <label htmlFor="child-grade" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Child&apos;s Grade Level
                  </label>
                  <select
                    id="child-grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-sky-100 bg-white text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  >
                    <option value="Grades K–2">Grades K–2 (Early Elementary)</option>
                    <option value="Grades 3–5">Grades 3–5 (Upper Elementary)</option>
                    <option value="Grades 6–8">Grades 6–8 (Middle School)</option>
                    <option value="Grade 9+">High School / Independent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location-area" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Location Preference
                  </label>
                  <select
                    id="location-area"
                    value={locationArea}
                    onChange={(e) => setLocationArea(e.target.value)}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-sky-100 bg-white text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  >
                    <option value="Lake Travis / Lakeway">Lake Travis / Lakeway, TX</option>
                    <option value="Bee Cave">Bee Cave, TX</option>
                    <option value="Westlake Hills">Westlake Hills, TX</option>
                    <option value="Austin Metro">Austin Metro</option>
                    <option value="Virtual / Homeschool">Virtual / Homeschool Online</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="program-track" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Program Track
                  </label>
                  <select
                    id="program-track"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-sky-100 bg-white text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  >
                    <option value="Elementary Programs">Elementary Programs (K–5)</option>
                    <option value="Middle School Programs">Middle School Programs (6–8)</option>
                    <option value="School Break Camps">School Break Camps</option>
                    <option value="Homeschool & Virtual">Homeschool &amp; Virtual</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="parent-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                  Questions or Special Interests (Optional)
                </label>
                <textarea
                  id="parent-notes"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what your child likes to create, or any specific questions about dates and format..."
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-200 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] hover:opacity-95 text-white font-bold rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Program Inquiry</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-1">
                We respect your privacy. Student data is never sold or shared. Communications sent only to parents.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
