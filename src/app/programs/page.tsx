import type { Metadata } from "next";
import { Suspense } from "react";
import { ProgramsCatalogClient } from "./ProgramsCatalogClient";

export const metadata: Metadata = {
  title: "Programs & Cohorts Catalog | Kreators Lab",
  description:
    "Explore hands-on after-school enrichment cohorts and school break camps in Austin, Lake Travis, and online. Filter by grade level, duration, and learning format.",
};

export default function ProgramsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9FE]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#5438DC] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-[#55506E]">
              Loading Kreators Lab Programs Catalog...
            </p>
          </div>
        </div>
      }
    >
      <ProgramsCatalogClient />
    </Suspense>
  );
}
