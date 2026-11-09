"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "@/data/siteContent";
import { trackEvent } from "@/lib/analytics";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire?: (projectName: string) => void;
}

export function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      trackEvent("project_view", {
        project_name: project.name,
        grade_level: project.grade,
      });
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-sky-100 bg-sky-50/70">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#FF5E36] to-[#FFAE00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              {project.grade}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-700 hover:bg-sky-100/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Project Screenshot / Thumbnail */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-sky-100">
            <Image
              src={project.thumbnail}
              alt={`${project.name} screenshot preview`}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900"
            >
              {project.name}
            </h3>

            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Key Milestones */}
          <div className="p-5 bg-sky-50/50 rounded-2xl border border-sky-100">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-3">
              Skills Practiced in this Project:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-sky-50/40 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            Want your child to build original projects like this?
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onInquire?.(project.name);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] hover:opacity-95 text-white text-xs sm:text-sm font-bold rounded-full shadow-md shadow-orange-500/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 cursor-pointer"
            >
              Inquire About Cohorts
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
