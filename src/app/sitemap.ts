import { MetadataRoute } from "next";
import { AFTER_SCHOOL_PROGRAMS, DAY_CAMPS } from "@/data/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kreatorslab.ai";
  const allPrograms = [...AFTER_SCHOOL_PROGRAMS, ...DAY_CAMPS];

  const programUrls: MetadataRoute.Sitemap = allPrograms.map((program) => ({
    url: `${baseUrl}/programs/${program.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}#programs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...programUrls,
  ];
}
