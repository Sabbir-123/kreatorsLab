export type MediaItemType = "photo" | "video";

export type GradeLevel =
  | "All Grades"
  | "Kindergarten (K)"
  | "Grade 1"
  | "Grade 2"
  | "Grade 3"
  | "Grade 4"
  | "Grade 5"
  | "Grade 6"
  | "Grade 7"
  | "Grade 8"
  | "Grade 9"
  | "Grade 10"
  | "Grade 11"
  | "Grade 12";

export type ProgramCategory =
  | "All Programs"
  | "Summer Camp"
  | "Thanksgiving Camp"
  | "Workshops"
  | "Classroom Activities"
  | "Student Projects"
  | "Special Events";

export interface GalleryMediaItem {
  id: string;
  title: string;
  type: MediaItemType;
  src: string;
  thumbnail: string;
  gradeLevel: GradeLevel;
  gradeBadge: string;
  category: ProgramCategory;
  caption: string;
  date?: string;
  featured?: boolean;
  bentoSize?: "wide" | "tall" | "square" | "standard";
  accentColor?: string;
}

export const GRADE_FILTER_OPTIONS: GradeLevel[] = [
  "All Grades",
  "Kindergarten (K)",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

export const PROGRAM_FILTER_OPTIONS: ProgramCategory[] = [
  "All Programs",
  "Summer Camp",
  "Thanksgiving Camp",
  "Workshops",
  "Classroom Activities",
  "Student Projects",
  "Special Events",
];

export const GALLERY_ITEMS: GalleryMediaItem[] = [
  {
    id: "gal-1",
    title: "Summer Camp: Hands-on Robotics & Autonomous Logic",
    type: "photo",
    src: "/images/founder/gallary1.JPG",
    thumbnail: "/images/founder/gallary1.JPG",
    gradeLevel: "Grade 6",
    gradeBadge: "Grades 6–8",
    category: "Summer Camp",
    caption: "Students collaborating on sensor calibration and pathfinding algorithms during our Austin Summer Camp.",
    date: "Summer 2026",
    featured: true,
    bentoSize: "wide",
    accentColor: "from-amber-50 to-orange-50",
  },
  {
    id: "gal-2",
    title: "Classroom Code Sprint: Visual Logic & Block Architecture",
    type: "photo",
    src: "/images/hero/building-laptop.jpg",
    thumbnail: "/images/hero/building-laptop.jpg",
    gradeLevel: "Grade 3",
    gradeBadge: "Grade 3",
    category: "Classroom Activities",
    caption: "Young maker wiring custom physics triggers and scoring loops during our afternoon enrichment sprint.",
    date: "Fall 2025",
    featured: true,
    bentoSize: "tall",
    accentColor: "from-purple-50 to-indigo-50",
  },
  {
    id: "gal-3",
    title: "Cute Cat Fishing Game: Interactive Demo Day Showcase",
    type: "video",
    src: "/videos/KREATORS.mp4",
    thumbnail: "/images/projects/cute-cat-fishing.jpg",
    gradeLevel: "Grade 1",
    gradeBadge: "Grade 1",
    category: "Student Projects",
    caption: "First-grader Luna presenting her completed interactive fishing game built with custom block physics and sound.",
    date: "Spring 2026",
    featured: true,
    bentoSize: "tall",
    accentColor: "from-blue-50 to-cyan-50",
  },
  {
    id: "gal-4",
    title: "Paper Storyboarding & Character Conception",
    type: "photo",
    src: "/images/hero/sketching-ideas.jpg",
    thumbnail: "/images/hero/sketching-ideas.jpg",
    gradeLevel: "Kindergarten (K)",
    gradeBadge: "Kindergarten (K)",
    category: "Classroom Activities",
    caption: "Before writing any code, young creators illustrate original characters and storyboard game world mechanics.",
    date: "Spring 2026",
    featured: true,
    bentoSize: "wide",
    accentColor: "from-emerald-50 to-teal-50",
  },
  {
    id: "gal-5",
    title: "Thanksgiving Camp: Multi-Level Holiday Arcade Sprint",
    type: "photo",
    src: "/images/programs/thanksgiving-camp.jpg",
    thumbnail: "/images/programs/thanksgiving-camp.jpg",
    gradeLevel: "Grade 5",
    gradeBadge: "Grade 5",
    category: "Thanksgiving Camp",
    caption: "Thanksgiving break makers teaming up to program collaborative holiday escape rooms and multi-level maze games.",
    date: "November 2025",
    featured: true,
    bentoSize: "square",
    accentColor: "from-rose-50 to-pink-50",
  },
  {
    id: "gal-6",
    title: "Peer Testing & Collaborative Bug Hunting",
    type: "photo",
    src: "/images/founder/gallary2.JPG",
    thumbnail: "/images/founder/gallary2.JPG",
    gradeLevel: "Grade 7",
    gradeBadge: "Grade 7",
    category: "Workshops",
    caption: "Student developers playtesting each other's custom boss fights and sharing constructive feedback.",
    date: "Winter 2025",
    featured: true,
    bentoSize: "square",
    accentColor: "from-violet-50 to-purple-50",
  },
  {
    id: "gal-7",
    title: "Friday Demo Day: Presenting Before Mentors and Families",
    type: "video",
    src: "/videos/kreators-lab-studio-loop.mp4",
    thumbnail: "/images/hero/presenting-project.jpg",
    gradeLevel: "Grade 8",
    gradeBadge: "Grade 8",
    category: "Special Events",
    caption: "Middle school cohort student taking the stage to explain their AI prompt architecture and live user interaction.",
    date: "Spring 2026",
    featured: true,
    bentoSize: "wide",
    accentColor: "from-sky-50 to-indigo-50",
  },
  {
    id: "gal-8",
    title: "High School Creative Technology Lab: Neural Networks & APIs",
    type: "photo",
    src: "/images/founder/gallary6.JPG",
    thumbnail: "/images/founder/gallary6.JPG",
    gradeLevel: "Grade 10",
    gradeBadge: "Grade 10",
    category: "Workshops",
    caption: "High school innovators exploring model latency, client-side routing, and real-time AI API integration.",
    date: "Spring 2026",
    featured: true,
    bentoSize: "standard",
    accentColor: "from-slate-50 to-gray-50",
  },
  {
    id: "gal-9",
    title: "Young AI Explorers: Storybook Prompt Crafting",
    type: "photo",
    src: "/images/programs/elementary-program.jpg",
    thumbnail: "/images/programs/elementary-program.jpg",
    gradeLevel: "Grade 2",
    gradeBadge: "Grade 2",
    category: "Classroom Activities",
    caption: "Grade 2 creators composing visual prompts and guiding child-friendly generative AI to generate dynamic story illustrations.",
    date: "Fall 2025",
    featured: false,
    bentoSize: "standard",
    accentColor: "from-amber-50 to-yellow-50",
  },
  {
    id: "gal-10",
    title: "March Mind Autonomous Grid Battle",
    type: "photo",
    src: "/images/projects/march-mind.jpg",
    thumbnail: "/images/projects/march-mind.jpg",
    gradeLevel: "Grade 7",
    gradeBadge: "Grade 7",
    category: "Student Projects",
    caption: "Grade 7 student's autonomous turn-based combat system calculating real-time Dijkstra path costs.",
    date: "Spring 2026",
    featured: false,
    bentoSize: "standard",
    accentColor: "from-indigo-50 to-blue-50",
  },
  {
    id: "gal-11",
    title: "Spring Break Maker Sprint: Collaborative Game Jam",
    type: "photo",
    src: "/images/programs/spring-break-camp.jpg",
    thumbnail: "/images/programs/spring-break-camp.jpg",
    gradeLevel: "Grade 4",
    gradeBadge: "Grade 4",
    category: "Summer Camp",
    caption: "Teams of 4 students designing, coding, and playtesting three arcade games in a rapid 3-day sprint.",
    date: "March 2026",
    featured: false,
    bentoSize: "wide",
    accentColor: "from-teal-50 to-emerald-50",
  },
  {
    id: "gal-12",
    title: "Hardware & Sensor Electronics Lab",
    type: "photo",
    src: "/images/founder/gallary9.JPG",
    thumbnail: "/images/founder/gallary9.JPG",
    gradeLevel: "Grade 9",
    gradeBadge: "Grade 9",
    category: "Workshops",
    caption: "Students wiring microcontrollers, ultrasonic distance sensors, and LED visualizers into physical game controllers.",
    date: "Winter 2025",
    featured: false,
    bentoSize: "tall",
    accentColor: "from-cyan-50 to-sky-50",
  },
  {
    id: "gal-13",
    title: "Banana Emotional Therapy Voice Companion",
    type: "photo",
    src: "/images/projects/banana-therapy.jpg",
    thumbnail: "/images/projects/banana-therapy.jpg",
    gradeLevel: "Grade 3",
    gradeBadge: "Grade 3",
    category: "Student Projects",
    caption: "Grade 3 student built an empathetic conversational mascot providing friendly motivation and jokes when sadness is detected.",
    date: "Spring 2026",
    featured: false,
    bentoSize: "standard",
    accentColor: "from-yellow-50 to-amber-50",
  },
  {
    id: "gal-14",
    title: "Middle School AI Enrichment: Logic & Branching Dialogue",
    type: "photo",
    src: "/images/programs/middle-school-program.jpg",
    thumbnail: "/images/programs/middle-school-program.jpg",
    gradeLevel: "Grade 8",
    gradeBadge: "Grade 8",
    category: "Classroom Activities",
    caption: "Middle schoolers building complex state machines and adaptive dialogue trees for interactive RPGs.",
    date: "Fall 2025",
    featured: false,
    bentoSize: "wide",
    accentColor: "from-purple-50 to-violet-50",
  },
  {
    id: "gal-15",
    title: "Mentor-Guided 1:1 Troubleshooting Session",
    type: "photo",
    src: "/images/founder/actually_knows.JPG",
    thumbnail: "/images/founder/actually_knows.JPG",
    gradeLevel: "Grade 6",
    gradeBadge: "Grade 6",
    category: "Classroom Activities",
    caption: "Our expert mentor walking through infinite loop debugging and variable state tracking with a young creator.",
    date: "Winter 2025",
    featured: false,
    bentoSize: "standard",
    accentColor: "from-orange-50 to-rose-50",
  },
  {
    id: "gal-16",
    title: "AI Proxy Manager: Senior High School Portfolio Project",
    type: "photo",
    src: "/images/projects/ai-proxy-manager.jpg",
    thumbnail: "/images/projects/ai-proxy-manager.jpg",
    gradeLevel: "Grade 11",
    gradeBadge: "Grade 11",
    category: "Student Projects",
    caption: "Grade 11 developer created a rate-limiting proxy and latency monitor benchmarked across multiple inference providers.",
    date: "Spring 2026",
    featured: false,
    bentoSize: "standard",
    accentColor: "from-emerald-50 to-green-50",
  },
  {
    id: "gal-17",
    title: "Winter Holiday Camp: Retro Pixel Animation Workshop",
    type: "photo",
    src: "/images/programs/holiday-camp-1.jpg",
    thumbnail: "/images/programs/holiday-camp-1.jpg",
    gradeLevel: "Grade 5",
    gradeBadge: "Grade 5",
    category: "Thanksgiving Camp",
    caption: "Holiday camp creators animating 8-bit sprites and designing custom chiptune sound effects.",
    date: "December 2025",
    featured: false,
    bentoSize: "standard",
    accentColor: "from-blue-50 to-indigo-50",
  },
  {
    id: "gal-18",
    title: "Senior Studio Showcase: Web3 & Machine Learning Systems",
    type: "photo",
    src: "/images/founder/gallery4.JPG",
    thumbnail: "/images/founder/gallery4.JPG",
    gradeLevel: "Grade 12",
    gradeBadge: "Grade 12",
    category: "Special Events",
    caption: "High school senior demonstrating a deployed neural net that interprets user sketches into 3D polygon meshes.",
    date: "Spring 2026",
    featured: false,
    bentoSize: "wide",
    accentColor: "from-fuchsia-50 to-pink-50",
  },
];

