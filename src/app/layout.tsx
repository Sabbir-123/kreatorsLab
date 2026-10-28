import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kreators Lab | AI Classes & Creative Projects for Kids",
  description:
    "Discover Kreators Lab, where young creators think independently, explore AI responsibly, and build real digital projects. Explore programs for families in Lake Travis and West Austin.",
  keywords: [
    "AI classes for kids",
    "K-12 AI education",
    "kids creative coding Austin",
    "Lake Travis STEM camps",
    "Lakeway kids technology classes",
    "Bee Cave creative tech lab",
    "Westlake youth AI workshops",
    "Kreators Lab",
    "project-based learning kids",
  ],
  authors: [{ name: "Kreators Lab", url: "https://www.kreatorslab.ai" }],
  metadataBase: new URL("https://www.kreatorslab.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kreators Lab | Think. Innovate. Explore.",
    description:
      "The AI program where kids think and build real things. At Kreators Lab, kids think creatively, innovate with AI, and turn their ideas into games, websites, animations, and projects they’re excited to share.",
    url: "https://www.kreatorslab.ai",
    siteName: "Kreators Lab",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/building-laptop.jpg",
        width: 1200,
        height: 630,
        alt: "Students actively creating digital projects at Kreators Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreators Lab | The AI program where kids think and build real things",
    description:
      "Think. Innovate. Explore. At Kreators Lab, kids think creatively, innovate with AI, and turn their ideas into games, websites, animations, and projects they’re excited to share.",
    images: ["/images/hero/building-laptop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Kreators Lab",
    url: "https://www.kreatorslab.ai",
    slogan: "Think. Innovate. Explore.",
    description:
      "The AI program where kids think and build real things.",
    areaServed: [
      "Lake Travis, TX",
      "Lakeway, TX",
      "Bee Cave, TX",
      "Westlake, TX",
      "Austin, TX",
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "K-12 Students and Parents",
    },
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${greatVibes.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-brand-dark bg-white selection:bg-brand-purple selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-brand-purple text-white px-4 py-2 rounded-lg font-semibold shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
