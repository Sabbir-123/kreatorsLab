import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsCatalogClient } from "./ProjectsCatalogClient";

export const metadata: Metadata = {
  title: "Student Projects Gallery | Kreators Lab",
  description:
    "Explore real working games, interactive AI applications, synthesizers, and animations built by Kreators Lab students across Austin and Lake Travis.",
};

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9FE]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#35309B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-[#55506E]">
              Loading Student Projects Gallery...
            </p>
          </div>
        </div>
      }
    >
      <ProjectsCatalogClient />
    </Suspense>
  );
}
