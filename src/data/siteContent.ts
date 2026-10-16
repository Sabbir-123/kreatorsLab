export interface ProjectItem {
  id: string;
  name: string;
  grade: string;
  category: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  videoUrl?: string;
  studentQuote?: string;
  isPlaceholder?: boolean;
}

export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  gradeSpan: string;
  description: string;
  highlights: string[];
  image: string;
  ctaText: string;
  badge?: string;
  status?: string;
}

export interface SectionProgramItem {
  id: string;
  title: string;
  category: "after-school" | "day-camp";
  dateRange: string;
  scheduleDays: string;
  scheduleTime: string;
  classCount: string;
  grades: string;
  regularPrice: string;
  promoPrice: string;
  savingsBadge: string;
  image: string;
  ctaText: string;
  description?: string;
}

export interface MethodStep {
  step: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  stageBadge?: string;
  studentFocus?: string;
  skills?: string[];
  takeaway?: string;
}

export interface ParentBenefit {
  title: string;
  description: string;
  iconName: string;
}

export interface WeekDay {
  day: string;
  title: string;
  description: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  qualification: string;
  bio: string;
  avatarPlaceholder: string;
  isPlaceholder: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  parentName: string;
  location: string;
  studentGrade: string;
  programEnrolled: string;
  isVerifiedPlaceholder: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  brandName: "Kreators Lab",
  tagline: "Think | Innovation | Excitement",
  headline: "Your Child Has Big Ideas. Let's Bring Them to Life.",
  heroSupportingText:
    "At Kreators Lab, kids think for themselves, explore AI, and turn their Ideas into Games, Stories, and Projects they're excited to share.",
  geographicFocus: "Lake Travis, Lakeway, Bee Cave, Westlake Hills, and surrounding West Austin communities.",
  contactEmail: "hello@kreatorslab.ai",
  officialWebsite: "https://www.kreatorslab.ai",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "cat-fishing-game",
    name: "Cute Cat Fishing Game",
    grade: "Grade 1",
    category: "Game Design & Logic",
    summary:
      "A student-conceived interactive fishing game featuring original character designs and scoring logic developed through playful visual blocks and guided AI illustration tools.",
    tags: ["Visual Logic", "Interactive Story", "Character Design"],
    thumbnail: "/images/projects/cute-cat-fishing.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    studentQuote: "I drew my cat Leo and coded the line so bigger fish give bonus score!",
    isPlaceholder: true,
  },
  {
    id: "banana-emotional-therapy",
    name: "Banana Emotional Therapy",
    grade: "Grades 3–4",
    category: "Interactive Storytelling",
    summary:
      "An imaginative emotional intelligence experience where a cheerful banana companion listens and responds to daily moods, combining creative branching dialogue with kid-friendly AI assistance.",
    tags: ["Creative Writing", "AI Prompting", "Interactive Dialogue"],
    thumbnail: "/images/projects/banana-therapy.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    studentQuote: "Peel-Good Banana asks how school went and gives cheerful AI advice when you feel tired.",
    isPlaceholder: true,
  },
  {
    id: "ai-proxy-manager",
    name: "AI Proxy Manager",
    grade: "Grade 7",
    category: "Software & Systems",
    summary:
      "A technical student project exploring how API requests and proxy routing function, built to understand privacy, data pathways, and secure network workflows.",
    tags: ["System Architecture", "Responsible AI", "Network Logic"],
    thumbnail: "/images/projects/ai-proxy-manager.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    studentQuote: "I mapped how AI requests travel through rate-limiters and safe filters to protect student privacy.",
    isPlaceholder: true,
  },
  {
    id: "march-mind",
    name: "March Mind",
    grade: "Grade 7",
    category: "Strategy & Simulation",
    summary:
      "A turn-based algorithmic puzzle and simulation game testing decision-making trees, autonomous pathfinding, and computational strategy.",
    tags: ["Algorithmic Design", "State Machines", "Puzzle Logic"],
    thumbnail: "/images/projects/march-mind.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    studentQuote: "It's an autonomous grid battle where agents calculate path cost every single turn.",
    isPlaceholder: true,
  },
];

export const METHOD_STEPS: MethodStep[] = [
  {
    step: "01",
    title: "THINK",
    headline: "Every Idea Starts Somewhere.",
    description:
      "Students brainstorm, sketch ideas, and decide what they want to create. Before touching any tools, they map out what makes their creation uniquely theirs.",
    image: "/images/method/step-1-think.jpg",
    stageBadge: "Stage 01 • Ideation & Concept",
    studentFocus: "Storyboarding game worlds & sketching original characters",
    skills: ["Creative Brainstorming", "Visual Storyboarding", "Concept Design"],
    takeaway: "Independent thinking starts with turning curiosity into a tangible plan.",
  },
  {
    step: "02",
    title: "BUILD",
    headline: "Bring It to Life.",
    description:
      "Students use guided AI and creative technology to begin turning their plans into digital projects, interactive games, and responsive apps.",
    image: "/images/method/step-2-build.jpg",
    stageBadge: "Stage 02 • Creation & Logic",
    studentFocus: "Composing logic, connecting mechanics, and training friendly AI prompts",
    skills: ["Visual Block Coding", "AI Prompt Crafting", "Computational Logic"],
    takeaway: "Students discover they are creators, not just consumers of technology.",
  },
  {
    step: "03",
    title: "TEST",
    headline: "Try It. Make It Better.",
    description:
      "Students explore what works, investigate what doesn't, and improve their creations through hands-on playtesting and collaborative feedback.",
    image: "/images/method/step-3-test.jpg",
    stageBadge: "Stage 03 • Playtest & Iterate",
    studentFocus: "Collaborative playtesting, identifying edge cases, and tweaking controls",
    skills: ["Playtesting & Feedback", "Debugging Mindset", "User Experience (UX)"],
    takeaway: "Bugs aren't mistakes—they're puzzles waiting to be solved.",
  },
  {
    step: "04",
    title: "PUBLISH",
    headline: "Get Ready to Share.",
    description:
      "Students prepare their creations for appropriate demonstration or sharing with safety guidance, polishing audio, menus, and visual flow.",
    image: "/images/method/step-4-publish.jpg",
    stageBadge: "Stage 04 • Polish & Safety",
    studentFocus: "Polishing menus, sound effects, and ensuring safe data practices",
    skills: ["UI / Audio Polish", "Digital Safety", "Responsible AI Guardrails"],
    takeaway: "Pride in craftsmanship comes from adding thoughtful finishing touches.",
  },
  {
    step: "05",
    title: "PRESENT",
    headline: "Show What You Made.",
    description:
      "Students explain their projects, decisions, and discoveries—gaining pride and public speaking confidence by sharing their achievements.",
    image: "/images/method/step-5-present.jpg",
    stageBadge: "Stage 05 • Showcase & Celebration",
    studentFocus: "Live demonstration, articulating decisions, and answering audience questions",
    skills: ["Public Speaking", "Technical Articulation", "Creative Confidence"],
    takeaway: "The real achievement isn't just the code—it's the pride of saying 'I made this!'",
  },
];

export interface ParentBenefit {
  title: string;
  description: string;
  iconName: string;
  tag?: string;
  category?: string;
  highlight?: string;
}

export const PARENT_BENEFITS: ParentBenefit[] = [
  {
    title: "Independent Thinking",
    description:
      "Students learn to formulate original hypotheses and design solutions rather than relying on pre-packaged answers.",
    iconName: "Brain",
    tag: "Autonomous Mindset",
    category: "Cognitive Growth",
    highlight: "Original ideas over copy-paste prompts",
  },
  {
    title: "Creative Problem-Solving",
    description:
      "Students break complex technological challenges into clear, manageable steps using computational reasoning.",
    iconName: "Cpu",
    tag: "Algorithmic Logic",
    category: "Technical Craft",
    highlight: "Deconstructing complexity into modular logic",
  },
  {
    title: "Confidence Through Creation",
    description:
      "Building tangible games and interactive experiences transforms passive consumers into confident digital makers.",
    iconName: "Trophy",
    tag: "Maker Agency",
    category: "Self-Efficacy",
    highlight: "Real projects they can proudly say 'I made!'",
  },
  {
    title: "Responsible AI Use",
    description:
      "Students investigate AI's superpowers, ethical boundaries, privacy considerations, and hallucinations with guided supervision.",
    iconName: "ShieldCheck",
    tag: "Digital Ethics",
    category: "Safety & Privacy",
    highlight: "Safe guardrails and critical AI literacy",
  },
  {
    title: "Communication Skills",
    description:
      "Students learn to articulate design choices, present working prototypes to peers, and incorporate constructive feedback.",
    iconName: "MessageSquareQuote",
    tag: "Peer Articulation",
    category: "Collaboration",
    highlight: "Expressing technical decisions with clarity",
  },
  {
    title: "Curiosity That Keeps Growing",
    description:
      "Every answer sparks ten new 'what if?' questions, cultivating a lifelong passion for experimentation and discovery.",
    iconName: "Rocket",
    tag: "Lifelong Wonder",
    category: "Exploration",
    highlight: "Fearless inquiry and creative exploration",
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: "elementary",
    title: "Elementary Programs",
    subtitle: "Big Imaginations Start Here.",
    gradeSpan: "Grades K–5",
    description:
      "An inviting introduction to AI and creative technology through age-appropriate guided projects.",
    highlights: [
      "Interactive storybooks & digital games",
      "Sketch-to-screen creative thinking",
      "Kid-safe AI sandbox environments",
      "Small ratios with supportive mentors",
    ],
    image: "/images/programs/elementary-program.jpg",
    ctaText: "Explore Elementary Programs",
    badge: "Currently Enrolling",
    status: "Active Cohorts",
  },
  {
    id: "middle-school",
    title: "Middle School Programs",
    subtitle: "Bigger Ideas. New Challenges.",
    gradeSpan: "Grades 6–8",
    description:
      "Students explore more involved projects while practicing design, problem-solving, and independent thinking.",
    highlights: [
      "Logic, interactive apps & simulation",
      "Critical thinking & verifying AI outputs",
      "Portfolio project architecture",
      "Collaborative team challenges",
    ],
    image: "/images/programs/middle-school-program.jpg",
    ctaText: "Explore Middle School Programs",
    badge: "Currently Enrolling",
    status: "Active Cohorts",
  },
  {
    id: "camps",
    title: "School Break Camps",
    subtitle: "Make Your Break Something to Remember.",
    gradeSpan: "Elementary & Middle School",
    description:
      "Turn time away from school into an opportunity to imagine, create, and explore technology.",
    highlights: [
      "5-day sprint from sketch to final presentation",
      "Summer, Spring Break & Holiday sessions",
      "Hands-on physical-meets-digital creation",
      "Friday Student Showcase for parents",
    ],
    image: "/images/programs/camps-program.jpg",
    ctaText: "Explore Camps",
    badge: "Seasonal Schedules",
    status: "Upcoming Sessions",
  },
  {
    id: "homeschool-virtual",
    title: "Homeschool & Virtual Learning",
    subtitle: "Creative Learning That Fits Your Schedule.",
    gradeSpan: "Grades K–8",
    description:
      "Explore available homeschool and online learning formats.",
    highlights: [
      "Flexible weekday morning & afternoon cohorts",
      "Curriculum aligned with STEAM goals",
      "Interactive live mentorship sessions",
      "Self-directed creative milestones",
    ],
    image: "/images/programs/homeschool-program.jpg",
    ctaText: "See Available Programs",
    badge: "Flexible Formats",
    status: "Inquire for Availability",
  },
];

export const AFTER_SCHOOL_PROGRAMS: SectionProgramItem[] = [
  {
    id: "middle-school-virtual",
    title: "Middle School Level: Virtual (Tuesday)",
    category: "after-school",
    dateRange: "August 25 – November 10",
    scheduleDays: "Every Tuesdays",
    scheduleTime: "Time: 5:30–6:15 PM",
    classCount: "12 Classes",
    grades: "Grades: 6–8",
    regularPrice: "$599",
    promoPrice: "$499",
    savingsBadge: "Save $100",
    image: "/images/programs/fall-enrichment.jpg",
    ctaText: "Enroll Now",
    description: "Deep dive into hands-on AI game mechanics, creative logic, and autonomous projects.",
  },
  {
    id: "spring-ai-enrichment-wednesday",
    title: "Spring AI Enrichment: Live (Wednesday)",
    category: "after-school",
    dateRange: "August 25 – November 10",
    scheduleDays: "Every Tuesdays",
    scheduleTime: "Time: 5:30–6:15 PM",
    classCount: "12 Classes",
    grades: "Grades: 6–8",
    regularPrice: "$599",
    promoPrice: "$499",
    savingsBadge: "Save $100",
    image: "/images/programs/spring-enrichment.jpg",
    ctaText: "Enroll Now",
    description: "Build advanced multi-step software creations, interactive models, and showcase games.",
  },
  {
    id: "spring-ai-enrichment-live",
    title: "Spring AI Enrichment: Live (Wednesday)",
    category: "after-school",
    dateRange: "August 25 – November 10",
    scheduleDays: "Every Tuesdays",
    scheduleTime: "Time: 5:30–6:15 PM",
    classCount: "12 Classes",
    grades: "Grades: 6–8",
    regularPrice: "$599",
    promoPrice: "$499",
    savingsBadge: "Save $100",
    image: "/images/programs/middle-school-program.jpg",
    ctaText: "Enroll Now",
    description: "Interactive live studio exploring computational logic and prompt architecture.",
  },
];

export const DAY_CAMPS: SectionProgramItem[] = [
  {
    id: "thanksgiving-camp",
    title: "Thanksgiving Camp: Game Prototyping",
    category: "day-camp",
    dateRange: "November 23 – November 25",
    scheduleDays: "Mon – Wed",
    scheduleTime: "Time: 9:00 AM – 3:00 PM",
    classCount: "3 Days",
    grades: "Grades: 4–8",
    regularPrice: "$349",
    promoPrice: "$279",
    savingsBadge: "Save $70",
    image: "/images/programs/thanksgiving-camp.jpg",
    ctaText: "Enroll Now",
    description: "3 days of high-energy game prototyping, fall creative coding, and collaborative design.",
  },
  {
    id: "holiday-camp-1",
    title: "Holiday Camp 1: Winter Creative Tech",
    category: "day-camp",
    dateRange: "December 21 – December 23",
    scheduleDays: "Mon – Wed",
    scheduleTime: "Time: 9:00 AM – 3:00 PM",
    classCount: "3 Days",
    grades: "Grades: 4–8",
    regularPrice: "$349",
    promoPrice: "$279",
    savingsBadge: "Save $70",
    image: "/images/programs/holiday-camp-1.jpg",
    ctaText: "Enroll Now",
    description: "Turn holiday downtime into imaginative building: digital toys, winter art, and AI prompts.",
  },
  {
    id: "holiday-camp-2",
    title: "Holiday Camp 2: New Year AI Sprint",
    category: "day-camp",
    dateRange: "December 28 – December 31",
    scheduleDays: "Mon – Thu",
    scheduleTime: "Time: 9:00 AM – 3:00 PM",
    classCount: "4 Days",
    grades: "Grades: 4–8",
    regularPrice: "$449",
    promoPrice: "$359",
    savingsBadge: "Save $90",
    image: "/images/programs/holiday-camp-2.jpg",
    ctaText: "Enroll Now",
    description: "Ring in the new year creating your own playable indie app or interactive story.",
  },
  {
    id: "spring-break-camp",
    title: "Spring Break Camp: 5-Day Sprint",
    category: "day-camp",
    dateRange: "March 15 – March 19",
    scheduleDays: "Mon – Fri",
    scheduleTime: "Time: 9:00 AM – 3:00 PM",
    classCount: "5 Days",
    grades: "Grades: 4–8",
    regularPrice: "$549",
    promoPrice: "$449",
    savingsBadge: "Save $100",
    image: "/images/programs/spring-break-camp.jpg",
    ctaText: "Enroll Now",
    description: "An intensive 5-day builder sprint from concept to Friday student showcase.",
  },
  {
    id: "summer-camp",
    title: "Summer Camp: Weekly AI Maker Lab",
    category: "day-camp",
    dateRange: "May 31 – August 7",
    scheduleDays: "Weekly Sprints",
    scheduleTime: "Time: 9:00 AM – 3:00 PM",
    classCount: "10 Weeks",
    grades: "Grades: 3–8",
    regularPrice: "$599",
    promoPrice: "$499",
    savingsBadge: "Save $100",
    image: "/images/programs/summer-camp.jpg",
    ctaText: "Enroll Now",
    description: "10 flexible weeks of summer maker sprints—join for 1 week or the whole season.",
  },
];

export const WEEK_DAYS: WeekDay[] = [
  {
    day: "Monday",
    title: "Dream It.",
    description: "Get curious, brainstorm, and sketch.",
  },
  {
    day: "Tuesday",
    title: "Start Building.",
    description: "Explore tools and begin making the project.",
  },
  {
    day: "Wednesday",
    title: "Keep Creating.",
    description: "Solve problems and add new features.",
  },
  {
    day: "Thursday",
    title: "Test & Improve.",
    description: "Investigate challenges and refine the work.",
  },
  {
    day: "Friday",
    title: "Show & Celebrate.",
    description: "Present projects and reflect on the experience.",
  },
];

export const MENTORS: MentorProfile[] = [
  {
    id: "mentor-lead",
    name: "Lead Innovation Mentor",
    role: "Director of Curriculum & Instruction",
    qualification: "EdTech & Computer Science Educator",
    bio: "Passionate about empowering young minds to move from passive consumers of technology to confident, curious creators.",
    avatarPlaceholder: "/images/mentors/mentor-lead.jpg",
    isPlaceholder: true,
  },
  {
    id: "mentor-creative",
    name: "Creative Technology Specialist",
    role: "Project Mentor & STEAM Facilitator",
    qualification: "Interactive Media & Design Background",
    bio: "Guides students through visual design, digital storytelling, and turning hand-drawn sketches into functional digital prototypes.",
    avatarPlaceholder: "/images/mentors/mentor-creative.jpg",
    isPlaceholder: true,
  },
  {
    id: "mentor-engineering",
    name: "AI & Logic Facilitator",
    role: "Systems & Coding Lead",
    qualification: "Software Engineering & Youth Mentorship",
    bio: "Specializes in demystifying algorithms, prompting literacy, and building responsible habits around emerging AI tools.",
    avatarPlaceholder: "/images/mentors/mentor-engineering.jpg",
    isPlaceholder: true,
  },
];

export const PARENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "parent-1",
    quote:
      "My daughter came home on day one with a notebook filled with drawings and said: 'Mom, I'm designing my own game!' Watching her actually build it and explain how it worked on Friday was breathtaking.",
    parentName: "Sarah M.",
    location: "Lakeway, TX",
    studentGrade: "3rd Grade Parent",
    programEnrolled: "Elementary Innovation Camp",
    isVerifiedPlaceholder: true,
  },
  {
    id: "parent-2",
    quote:
      "What stood out most wasn't just the AI tools, but how the instructors taught them to question what the computer suggested. My son learned to be critical, thoughtful, and creative.",
    parentName: "David K.",
    location: "Westlake / Austin, TX",
    studentGrade: "7th Grade Parent",
    programEnrolled: "Middle School AI Lab",
    isVerifiedPlaceholder: true,
  },
  {
    id: "parent-3",
    quote:
      "Kreators Lab gave our homeschool curriculum the hands-on tech spark we were missing. It feels like an actual studio for young creators, not another boring coding tutorial.",
    parentName: "Elena R.",
    location: "Bee Cave, TX",
    studentGrade: "5th Grade Parent",
    programEnrolled: "Homeschool STEAM Cohort",
    isVerifiedPlaceholder: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "coding-experience",
    question: "Does my child need coding experience?",
    answer:
      "Our existing introductory program information indicates prior coding experience is not required. Check each program for its specific prerequisites.",
  },
  {
    id: "what-will-they-create",
    question: "What will my child create?",
    answer:
      "Depending on the program, students may work on games, interactive stories, or other digital projects.",
  },
  {
    id: "how-different-from-coding",
    question: "How is Kreators Lab different from a coding class?",
    answer:
      "Our approach starts with the student's ideas and emphasizes planning, creative decisions, building, testing, and presenting projects.",
  },
  {
    id: "is-ai-safe",
    question: "Is AI safe for children?",
    answer:
      "Responsible AI use is part of our learning philosophy. Contact us for details about the tools and supervision practices of individual programs.",
  },
  {
    id: "what-grades-enroll",
    question: "What grades can enroll?",
    answer: "Eligibility varies by program.",
  },
  {
    id: "online-or-inperson",
    question: "Are classes online or in person?",
    answer: "Available formats depend on the current session.",
  },
  {
    id: "where-programs-held",
    question: "Where are programs held?",
    answer: "See individual program listings for confirmed locations.",
  },
  {
    id: "what-to-bring",
    question: "What should my child bring?",
    answer: "Program pages specify device and material requirements.",
  },
];
