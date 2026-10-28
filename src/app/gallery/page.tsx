import type { Metadata } from "next";
import { GalleryCatalogClient } from "./GalleryCatalogClient";

export const metadata: Metadata = {
  title: "Media Gallery | Life at Kreators Lab | Austin & Lake Travis",
  description:
    "Explore authentic photos, video demonstrations, student projects, classroom activities, summer camps, and workshops across grades K–12 at Kreators Lab.",
  openGraph: {
    title: "Media Gallery | Life at Kreators Lab",
    description:
      "Explore real classroom moments, student-built video games, robotics, and summer camps across grades K–12.",
    images: ["/images/founder/gallary1.JPG"],
  },
};

export default function GalleryPage() {
  return <GalleryCatalogClient />;
}

