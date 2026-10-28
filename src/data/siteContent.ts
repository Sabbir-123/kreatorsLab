export interface ProjectProcessStep {
  step: string;
  title: string;
  description: string;
  badge: string;
}

export interface ProjectOutcomeHighlight {
  title: string;
  value: string;
  description: string;
}

export interface ProjectAboutInfo {
  purpose: string;
  whatItDoes: string;
  whyItMatters: string;
  keyFeatures: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle?: string;
  grade: string;
  category: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  videoUrl?: string;
  presentationVideoUrl?: string;
  studentQuote?: string;
  isPlaceholder?: boolean;
  liveUrl?: string;
  howItWasMade?: string;
  screenshots?: string[];
  galleryCaptions?: string[];
  about?: ProjectAboutInfo;
  processSteps?: ProjectProcessStep[];
  outcomes?: ProjectOutcomeHighlight[];
  parentReview?: {
    quote: string;
    parentName: string;
    location: string;
  };
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
  tagline: "Think. Innovate. Explore.",
  headline: "The AI program where kids think and build real things.",
  heroSupportingText:
    "At Kreators Lab, kids think creatively, innovate with AI, and turn their ideas into games, websites, animations, and projects they’re excited to share.",
  heroGradesLine: "For students in grades K–12.",
  trustStatement: "Trusted by GT and Discovery families in the Austin Lake Travis area.",
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

export const CONFIRMED_PROJECT_CATEGORIES = [
  "All",
  "Game",
  "Music",
  "Website",
  "Animation",
  "Mobile App",
] as const;

export type ProjectCategory = (typeof CONFIRMED_PROJECT_CATEGORIES)[number];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "cat-fishing-game",
    name: "Cute Cat Fishing Game",
    subtitle: "A 2D arcade physics game coded with custom sprite assets and scoring algorithms.",
    grade: "Grade 1",
    category: "Game",
    summary:
      "Interactive fishing game featuring original character art and custom scoring logic built with visual coding blocks.",
    tags: ["Visual Logic", "Interactive Story", "Character Design", "Arcade Physics"],
    thumbnail: "/images/projects/cute-cat-fishing.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "I drew my cat Leo and coded the line so bigger fish give bonus score!",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/cat-fishing-game",
    howItWasMade:
      "Sketched character art on paper first, then converted it into digital sprites. The student coded coordinate physics for casting the fishing rod, random timers for 3 fish varieties, and sound triggers when a rare fish is caught.",
    screenshots: [
      "/images/projects/cute-cat-fishing.jpg",
      "/images/students/planning-laptop.jpg",
      "/images/method/step-1-think.jpg",
      "/images/hero/presenting-project.jpg",
    ],
    galleryCaptions: [
      "Luna's boat and custom animated fish swimming in underwater coordinate lanes",
      "Drafting sprite bounding boxes and casting coordinates on graph paper",
      "Brainstorming scoring multipliers and sound triggers with 1:8 mentor support",
      "Student proudly showcasing the playable build on screen during Friday Demo Day",
    ],
    about: {
      purpose: "Transform a 1st grader's love for their family cat into a playable, interactive physics arcade game.",
      whatItDoes: "Players control Leo the cat, casting a fishing line into moving water currents. By timing reels correctly, players catch common, uncommon, and rare golden fish while avoiding underwater obstacles.",
      whyItMatters: "Proves that children as young as 1st grade can master X/Y coordinate systems, variable timers, and condition loops when learning is playful and student-directed.",
      keyFeatures: [
        "Original student-drawn pixel sprites and animated water layers",
        "Coordinate-based casting physics with gravity and drag simulation",
        "Randomized fish spawn intervals with variable rarity multipliers",
        "Retro sound chimes and persistent high-score tracking",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "Paper First & Sprite Sketching",
        description: "Drew Leo the cat, fishing boat, and 3 sea creatures on graph paper to visualize dimensions before digital creation.",
        badge: "Ideation",
      },
      {
        step: "02",
        title: "Coordinate Physics & Timers",
        description: "Connected visual logic blocks to compute rod casting angles, downward velocity, and horizontal fish swim lanes.",
        badge: "Visual Logic",
      },
      {
        step: "03",
        title: "Playtesting & Score Multipliers",
        description: "Tested with cohort peers to tune reel speed and added bonus points when catching rare golden fish.",
        badge: "Playtesting",
      },
      {
        step: "04",
        title: "Friday Demo Day Presentation",
        description: "Stood before parents and classmates to demo live gameplay, explaining how condition loops prevented fish from escaping.",
        badge: "Showcase",
      },
    ],
    outcomes: [
      { title: "Visual Logic Blocks", value: "85+", description: "Connected blocks managing game state, variables, and sprite physics." },
      { title: "Original Sprites", value: "100%", description: "Every character and sea creature drawn and animated by the student." },
      { title: "Playtest Sessions", value: "30+", description: "Tested by cohort peers to balance reel speed and score multipliers." },
      { title: "Live Presentation", value: "Delivered", description: "Publicly presented on the big screen during cohort graduation." },
    ],
    parentReview: {
      quote:
        "My 1st grader was so proud to show me how he coded the scoring mechanics himself! It completely transformed screen time into creative building time.",
      parentName: "David M.",
      location: "Lake Travis Parent",
    },
  },
  {
    id: "banana-emotional-therapy",
    name: "Banana Emotional Therapy",
    subtitle: "An empathetic character companion supporting emotional check-ins through branching dialogue.",
    grade: "Grades 3–4",
    category: "Animation",
    summary:
      "An animated emotional check-in experience featuring an interactive character companion, branching dialogue, and AI assistance.",
    tags: ["Creative Writing", "AI Prompting", "Interactive Dialogue", "Character Animation"],
    thumbnail: "/images/projects/banana-therapy.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "Peel-Good Banana asks how school went and gives cheerful AI advice when you feel tired.",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/banana-emotional-therapy",
    howItWasMade:
      "Engineered prompt guardrails so the companion character always gives uplifting, child-safe advice. The student mapped out mood decision trees and animated facial expressions matching emotions.",
    screenshots: [
      "/images/projects/banana-therapy.jpg",
      "/images/students/collaborative-learning.jpg",
      "/images/hero/sketching-ideas.jpg",
      "/images/founder/gallary5.JPG",
    ],
    galleryCaptions: [
      "Peel-Good Banana emotional companion interactive greeting screen",
      "Mapping conversation flowcharts and feeling branches with cohort peers",
      "Brainstorming empathetic AI responses and visual mood expressions on paper",
      "Live peer testing of mood decision trees during Austin studio afternoon session",
    ],
    about: {
      purpose: "Create a safe, friendly animated companion to help children identify daily feelings and decompress after school.",
      whatItDoes: "Peel-Good Banana welcomes the user, prompts them to select their current energy level or emotion, and navigates branching dialogues offering encouragement and breathing exercises.",
      whyItMatters: "Introduces elementary students to conversational design, natural language processing guardrails, and socially supportive technology.",
      keyFeatures: [
        "Interactive mood decision tree with 6 distinct emotional pathways",
        "Animated facial expressions and posture changes synchronized to mood",
        "Child-safe AI prompt system preventing toxic or confusing replies",
        "Calming audio feedback and positive student-recorded sound bites",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "Empathy & Flowchart Mapping",
        description: "Mapped emotions onto paper decision trees, writing personalized comforting replies for each emotional state.",
        badge: "Empathy Design",
      },
      {
        step: "02",
        title: "AI Prompt Guardrails",
        description: "Constructed strict system prompts ensuring the companion character maintains an uplifting, supportive tone.",
        badge: "Responsible AI",
      },
      {
        step: "03",
        title: "Facial Expression State Machine",
        description: "Coded dynamic SVG and sprite state changes so the banana smiles, blinks, or tilts based on dialogue choices.",
        badge: "Frontend Logic",
      },
      {
        step: "04",
        title: "Peer Testing & Austin Showcase",
        description: "Observed classmates test the check-in companion, incorporated feedback, and presented findings to parents.",
        badge: "Showcase",
      },
    ],
    outcomes: [
      { title: "Dialogue Branches", value: "14 Paths", description: "Unique conversation flows supporting different daily feelings." },
      { title: "Safety Guardrails", value: "Verified", description: "Zero toxic prompts or unmonitored responses permitted." },
      { title: "Animated States", value: "6 Moods", description: "Dynamic character emotion shifts driven by player input." },
      { title: "Peer Rating", value: "5.0 ★", description: "Voted most creative interactive tool by elementary cohort peers." },
    ],
    parentReview: {
      quote:
        "Her curiosity blossomed. Instead of just playing video games, she's designing characters that help others express their feelings.",
      parentName: "Emily R.",
      location: "Westlake Parent",
    },
  },
  {
    id: "sonic-beat-studio",
    name: "Sonic Beat Studio",
    subtitle: "A digital audio sequencer and synth beatmaker exploring algorithmic rhythms and visual waveforms.",
    grade: "Grades 5–6",
    category: "Music",
    summary:
      "An interactive digital audio sequencer and synth beatmaker exploring algorithmic rhythms, audio filters, and visual waveforms.",
    tags: ["Audio Synthesis", "Pattern Sequencing", "Creative Coding", "Mathematical Logic"],
    thumbnail: "/images/projects/sonic-beat-studio.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "I programmed tempo switches and custom 8-bit drum beats for our podcast.",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/sonic-beat-studio",
    howItWasMade:
      "Synthesized custom 8-bit drum samples, programmed interactive BPM sliders, and coded visual waveform reactive animations using math sine waves.",
    screenshots: [
      "/images/projects/sonic-beat-studio.jpg",
      "/images/hero/building-laptop.jpg",
      "/images/method/step-3-test.jpg",
      "/images/founder/gallary8.JPG",
    ],
    galleryCaptions: [
      "Sonic Beat Studio 16-step grid sequencer and reactive sine waveform canvas",
      "Programming audio timing loops and millisecond clocks on studio laptops",
      "Testing drum frequency modulators with mentor guidance in Austin lab",
      "Student performing live synthesized electronic beat tracks for parents",
    ],
    about: {
      purpose: "Bridge mathematical pattern sequencing and electronic sound design by building a custom digital audio workstation.",
      whatItDoes: "Users toggle 16-step grid pads across four polyphonic instruments (Kick, Snare, Hi-Hat, Synth Lead), adjust real-time tempo (60–180 BPM), and watch audio frequencies visualize on a reactive canvas.",
      whyItMatters: "Demonstrates how coding, trigonometry (sine curves), and rhythmic fractions unite in modern music technology.",
      keyFeatures: [
        "16-step polyphonic rhythm sequencer with millisecond timing sync",
        "Synthesized 8-bit drum triggers and frequency pitch sliders",
        "Reactive 60 FPS HTML5 canvas displaying dynamic sine waveforms",
        "Audio buffer recording and instant loop playback controls",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "Rhythm Fractions & Timing Clocks",
        description: "Calculated note subdivisions (quarter, eighth, sixteenth) and translated BPM values into millisecond intervals.",
        badge: "Rhythm Math",
      },
      {
        step: "02",
        title: "Web Audio API Synthesis",
        description: "Engineered oscillators and noise buffers to synthesize punchy kick drums, crisp claps, and retro lead notes.",
        badge: "Sound Design",
      },
      {
        step: "03",
        title: "Reactive Waveform Canvas",
        description: "Connected audio frequency analyzer nodes to an HTML5 canvas, mapping wave amplitude to glowing visual lines.",
        badge: "Creative Coding",
      },
      {
        step: "04",
        title: "Live Studio Audio Demo",
        description: "Plugged laptop into studio speakers on Friday Demo Day and performed a 2-minute original beat track live.",
        badge: "Performance",
      },
    ],
    outcomes: [
      { title: "Sequencer Grid", value: "16 Steps", description: "Polyphonic grid running with zero timing drift." },
      { title: "Sound Presets", value: "8 Synth", description: "Original frequency profiles synthesized and tuned by the student." },
      { title: "Waveform FPS", value: "60 FPS", description: "Real-time canvas rendering reactive to audio frequency amplitude." },
      { title: "Track Export", value: "Mastered", description: "Adopted as the official theme music for the student tech cohort." },
    ],
    parentReview: {
      quote:
        "The 1:8 mentor ratio really made a difference. Our son learned how math and music connect through code.",
      parentName: "Marcus T.",
      location: "Austin Parent",
    },
  },
  {
    id: "pocket-ecotracker",
    name: "Pocket EcoTracker",
    subtitle: "A mobile nature companion app with Austin wildlife classification and daily streak tracking.",
    grade: "Grades 4–5",
    category: "Mobile App",
    summary:
      "A mobile nature companion app with species identification cards, daily streak tracking, and Austin nature spot guides.",
    tags: ["UI/UX Design", "Touch Gestures", "State Management", "Data Modeling"],
    thumbnail: "/images/projects/pocket-ecotracker.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "I designed the mobile interface and swipe gesture logic to log bird sightings in my backyard.",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/pocket-ecotracker",
    howItWasMade:
      "Built touch gesture swipe interactions, integrated wildlife species datasets for local Austin birds and plants, and programmed local storage state for daily exploration streaks.",
    screenshots: [
      "/images/projects/pocket-ecotracker.jpg",
      "/images/students/planning-laptop.jpg",
      "/images/founder/camp.JPG",
      "/images/founder/gallary1.JPG",
    ],
    galleryCaptions: [
      "Pocket EcoTracker mobile interface with Central Texas wildlife card and streak counter",
      "Sketching mobile screen wireframes and gesture interactions on studio paper",
      "Field testing wildlife identification cards on tablets outside during holiday camp",
      "Cohort students sharing outdoor species logs and testing touch sensitivity",
    ],
    about: {
      purpose: "Encourage kids to put down passive screens, explore Austin's greenbelts, and document local Central Texas biodiversity.",
      whatItDoes: "An intuitive mobile web application where young explorers swipe through species flashcards, log flora and fauna sightings, maintain daily exploration streaks, and unlock junior naturalist badges.",
      whyItMatters: "Demonstrates how mobile software can actively connect children to the real natural world, teaching touch UI ergonomics, data structures, and persistent storage.",
      keyFeatures: [
        "Touch-optimized card swipe gestures mimicking native mobile apps",
        "Curated dataset of 24 Central Texas birds, wildflowers, and reptiles",
        "Persistent local storage engine tracking consecutive exploration days",
        "Interactive Austin nature spots guide with family-friendly trail tips",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "Field Research & Wireframing",
        description: "Researched local Austin birds and reptiles, drafting mobile phone wireframes with large, thumb-friendly tap targets.",
        badge: "Mobile UX",
      },
      {
        step: "02",
        title: "Wildlife Data Modeling",
        description: "Created structured JSON objects containing species scientific names, identification photos, and fun habitat facts.",
        badge: "Data Schema",
      },
      {
        step: "03",
        title: "Touch Gestures & Local Storage",
        description: "Programmed touch event listeners for swipe animations and saved discovery logs to browser persistent storage.",
        badge: "State Logic",
      },
      {
        step: "04",
        title: "Outdoor Field Test & Demo",
        description: "Tested the app in the studio courtyard, logged real bird sightings, and presented the working app to parents.",
        badge: "Field Test",
      },
    ],
    outcomes: [
      { title: "Species Profiled", value: "24 Local", description: "Curated profiles of Central Texas birds, trees, and wildflowers." },
      { title: "Touch Latency", value: "<16ms", description: "Fluid 60 FPS swipe card transitions on mobile touch screens." },
      { title: "Streak Engine", value: "Saved", description: "Persistent daily log counter tracking consecutive days outdoors." },
      { title: "Family Adoption", value: "100%", description: "Adopted by student's family on weekend hikes around Lake Travis." },
    ],
    parentReview: {
      quote:
        "Our daughter now observes birds in our backyard and explains how she coded the mobile interface logic herself!",
      parentName: "Rachel K.",
      location: "Barton Creek Parent",
    },
  },
  {
    id: "ai-proxy-manager",
    name: "AI Proxy Manager",
    subtitle: "A web security proxy implementing rate limiting, API token protection, and child-safe AI filters.",
    grade: "Grade 7",
    category: "Website",
    summary:
      "A web utility exploring secure API proxy routing, request rate-limiting, and student data privacy workflows.",
    tags: ["System Architecture", "Responsible AI", "Network Logic", "Cybersecurity"],
    thumbnail: "/images/projects/ai-proxy-manager.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "I mapped how AI requests travel through rate-limiters and safe filters to protect student privacy.",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/ai-proxy-manager",
    howItWasMade:
      "Designed a secure web proxy architecture exploring rate limiting, input sanitization, and child-safe AI filters to demonstrate how privacy guardrails work in production software.",
    screenshots: [
      "/images/projects/ai-proxy-manager.jpg",
      "/images/hero/building-laptop.jpg",
      "/images/founder/gallary2.JPG",
      "/images/method/step-4-publish.jpg",
    ],
    galleryCaptions: [
      "AI Proxy Manager live monitoring dashboard showing token limits and latency graphs",
      "Mapping network hops and API gateway architectures on studio whiteboards",
      "Running simulated bot request floods to verify rate-limiting thresholds",
      "Deploying the secure proxy dashboard to cloud hosting with mentor review",
    ],
    about: {
      purpose: "Investigate and demystify how enterprise technology companies protect user privacy and prevent denial-of-service abuse in AI systems.",
      whatItDoes: "Simulates a full-stack API proxy dashboard that intercepts AI requests, strips personally identifiable information (PII), enforces token quotas per user, and visualizes live latency metrics.",
      whyItMatters: "Provides advanced middle school students with rare insight into backend systems architecture, ethics in artificial intelligence, and cybersecurity fundamentals.",
      keyFeatures: [
        "Real-time request stream inspector with live millisecond latency telemetry",
        "Token bucket algorithm enforcing user-tier request limits",
        "Automated regex PII scrubber stripping student names and emails",
        "Child-safety moderation filter blocking inappropriate AI query prompts",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "Threat Modeling & Gateway Design",
        description: "Identified security vulnerabilities in direct API calls and diagrammed proxy mediation layers on paper.",
        badge: "Architecture",
      },
      {
        step: "02",
        title: "Token Bucket Algorithm",
        description: "Implemented a rate-limiting algorithm that replenishes request tokens at a fixed per-second interval.",
        badge: "Algorithms",
      },
      {
        step: "03",
        title: "PII Scrubbing & Moderation",
        description: "Engineered string sanitizers and safety rules that quarantine sensitive student personal data.",
        badge: "Security",
      },
      {
        step: "04",
        title: "Live Stress Test & Demo",
        description: "Demonstrated simulated cyber stress tests on the projector, proving malicious payloads are rejected gracefully.",
        badge: "Showcase",
      },
    ],
    outcomes: [
      { title: "Sanitization Rate", value: "100%", description: "PII detection and sanitization across simulated student prompt batches." },
      { title: "Proxy Overhead", value: "<5ms", description: "Ultra-low latency request handling without measurable delay." },
      { title: "Architecture", value: "Production", description: "Adheres to industry enterprise API gateway design standards." },
      { title: "Cohort Award", value: "Top Tech", description: "Awarded top technical architecture project in Middle School cohort." },
    ],
    parentReview: {
      quote:
        "Seeing a 7th grader understand API tokens, rate limits, and cybersecurity was mind-blowing.",
      parentName: "Brian S.",
      location: "Austin Tech Parent",
    },
  },
  {
    id: "march-mind",
    name: "March Mind",
    subtitle: "A turn-based algorithmic grid strategy game featuring autonomous AI pathfinding decisions.",
    grade: "Grade 7",
    category: "Game",
    summary:
      "A turn-based algorithmic grid strategy game featuring autonomous pathfinding and decision-tree logic.",
    tags: ["Algorithmic Design", "State Machines", "Puzzle Logic", "AI Pathfinding"],
    thumbnail: "/images/projects/march-mind.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "It's an autonomous grid battle where agents calculate path cost every single turn.",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/march-mind",
    howItWasMade:
      "Programmed turn-based grid pathfinding using algorithmic state machines and coordinate arrays. Iteratively playtested with peers to balance unit move costs and defense strategies.",
    screenshots: [
      "/images/projects/march-mind.jpg",
      "/images/founder/gallary8.JPG",
      "/images/hero/presenting-project.jpg",
      "/images/founder/gallary6.JPG",
    ],
    galleryCaptions: [
      "March Mind 8x8 tactical grid view showing AI path cost heuristics and friendly units",
      "Calculating coordinate distance heuristics on graph pads during studio lab",
      "Student presenting the AI decision tree to cohort classmates at demo day",
      "Peer tournament round balancing human strategy against the autonomous bot",
    ],
    about: {
      purpose: "Explore how autonomous decision-making algorithms operate by building a turn-based grid strategy challenge.",
      whatItDoes: "Players command a tactical squad on an 8x8 grid. Each turn, the autonomous computer opponent analyzes player positioning, terrain cover, and Manhattan distance to execute optimal defensive and offensive maneuvers.",
      whyItMatters: "Bridges game development with computer science concepts like 2D matrix arrays, state machines, and heuristic cost evaluation.",
      keyFeatures: [
        "8x8 coordinate matrix with randomized terrain obstacles and cover bonuses",
        "Autonomous enemy bot powered by heuristic distance calculation",
        "Deterministic turn state machine managing Player, AI, and Combat resolution",
        "Visual move-radius highlights and real-time damage forecast calculators",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "2D Matrix & Coordinate Math",
        description: "Mapped the game board into a 2D coordinate array, establishing valid move distances and obstacle collision rules.",
        badge: "Discrete Math",
      },
      {
        step: "02",
        title: "Turn State Machine",
        description: "Constructed deterministic states preventing player input during AI calculations and combat animations.",
        badge: "State Machines",
      },
      {
        step: "03",
        title: "Heuristic AI Pathfinding",
        description: "Programmed the bot to calculate Manhattan distance and score tiles based on cover value and proximity.",
        badge: "Algorithms",
      },
      {
        step: "04",
        title: "Cohort Tournament Showcase",
        description: "Hosted a live tournament where students tested varied strategies against the AI bot to find balance exploits.",
        badge: "Playtesting",
      },
    ],
    outcomes: [
      { title: "Grid Cells", value: "64 Tiles", description: "Dynamic coordinate array managing unit positions and cover stats." },
      { title: "AI Decision Speed", value: "0.2s", description: "Instant path calculation using optimized distance heuristics." },
      { title: "Playtest Win Rate", value: "54%", description: "Carefully balanced so human strategic thinking defeats the bot." },
      { title: "Live Matches", value: "40+", description: "Played and validated during Friday afternoon demo tournament." },
    ],
    parentReview: {
      quote:
        "He learned persistence when his pathfinding code had bugs. The mentors showed him how to break down complex problems step-by-step.",
      parentName: "Jennifer L.",
      location: "Steiner Ranch Parent",
    },
  },
  {
    id: "nebula-odyssey",
    name: "Cosmic Paws Odyssey",
    subtitle: "An animated space cutscene with branching player decisions and particle thruster physics.",
    grade: "Grades 2–3",
    category: "Animation",
    summary:
      "A space animation cutscene featuring an astronaut cat, branching dialogue choices, and custom sound effects.",
    tags: ["Frame Animation", "Interactive Story", "Character Physics", "Audio Sync"],
    thumbnail: "/images/projects/nebula-odyssey.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "I animated the rocket booster particles and created branching choices for the alien encounter.",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/nebula-odyssey",
    howItWasMade:
      "Created frame-by-frame character sprite cutscenes, coded interactive choice branching, and engineered atmospheric space audio with dynamic particle effects.",
    screenshots: [
      "/images/projects/nebula-odyssey.jpg",
      "/images/hero/sketching-ideas.jpg",
      "/images/students/collaborative-learning.jpg",
      "/images/method/step-5-present.jpg",
    ],
    galleryCaptions: [
      "Cosmic Paws Odyssey interactive space cutscene and player choice interface",
      "Storyboard sketches on paper detailing Captain Whiskers' rocket journey",
      "Pair-programming rocket particle thruster physics and background starfield",
      "Student proudly demonstrating the branching alien encounter at Friday Demo Day",
    ],
    about: {
      purpose: "Unite creative storytelling, character animation, and interactive game mechanics into a cinematic space adventure.",
      whatItDoes: "Follows Captain Whiskers aboard the Starship Paw-1. At key moments, viewers make real-time decisions that affect thruster speed, initiate alien first-contact dialogues, and steer the ship toward 3 unique endings.",
      whyItMatters: "Empowers 2nd and 3rd grade students to become digital filmmakers who write stories, animate custom sprites, and program interactive branches.",
      keyFeatures: [
        "Frame-by-frame animated astronaut cat with responsive facial expressions",
        "Interactive branch decision points altering the narrative trajectory",
        "Dynamic particle generator simulating colorful rocket thruster exhaust",
        "Layered space synth audio tracks synchronized to dramatic story events",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "Storyboarding & Plot Branches",
        description: "Drafted a three-act space adventure on index cards, charting branching story paths and dramatic alien interactions.",
        badge: "Storyboarding",
      },
      {
        step: "02",
        title: "Sprite Animation & Starfield",
        description: "Illustrated the spaceship and animated twinkling parallax stars moving at differing background velocities.",
        badge: "Animation",
      },
      {
        step: "03",
        title: "Particle Physics & Sound Sync",
        description: "Wrote loop logic spawning rocket booster particles and synchronized dramatic sound effects to explosions and warp speed.",
        badge: "Physics & Audio",
      },
      {
        step: "04",
        title: "Audience Choice Live Demo",
        description: "Projected the animation on the big screen during Demo Day, having parents vote on which path Captain Whiskers took.",
        badge: "Live Showcase",
      },
    ],
    outcomes: [
      { title: "Story Endings", value: "3 Unique", description: "Distinct narrative conclusions driven by user decisions." },
      { title: "Particle Count", value: "120/sec", description: "Real-time particle generation for spaceship booster physics." },
      { title: "Audio Tracks", value: "4 Custom", description: "Layered space synth chords and retro sound effect triggers." },
      { title: "Audience Votes", value: "Unanimous", description: "Voted most creative storytelling project by demo day parents." },
    ],
    parentReview: {
      quote:
        "The Friday demo gave her so much confidence. She stood up in front of the cohort and proudly explained her animation choices.",
      parentName: "Carlos P.",
      location: "Round Rock Parent",
    },
  },
  {
    id: "austin-makers-hub",
    name: "Austin Young Makers Hub",
    subtitle: "A community directory connecting Austin youth to maker workshops and creative robotics events.",
    grade: "Grades 6–8",
    category: "Website",
    summary:
      "A community resource directory featuring interactive search filters, project showcases, and local workshop calendars.",
    tags: ["Web Development", "Responsive Layout", "Data Filtering", "Community Tech"],
    thumbnail: "/images/projects/austin-makers-hub.jpg",
    videoUrl: "/videos/kreators-lab-studio-loop.mp4",
    presentationVideoUrl: "/videos/KREATORS.mp4",
    studentQuote: "I built responsive navigation grids and dynamic search filters so friends can find local maker events.",
    isPlaceholder: false,
    liveUrl: "https://kreatorslab.ai/demo/austin-makers-hub",
    howItWasMade:
      "Constructed responsive grid layouts with instant search filtering, tagged categories for local Austin robotics and creative tech events, and styled with accessible UI standards.",
    screenshots: [
      "/images/projects/austin-makers-hub.jpg",
      "/images/founder/camp.JPG",
      "/images/founder/actually_knows.JPG",
      "/images/founder/gallary9.JPG",
    ],
    galleryCaptions: [
      "Austin Young Makers Hub homepage with interactive search and category chips",
      "Reviewing local Austin youth maker programs and drafting UI wireframes",
      "Showcasing the responsive live directory on laptop and mobile screen",
      "Demonstrating instant search filters and event bookmarking to parents",
    ],
    about: {
      purpose: "Solve a real community problem by providing Austin families with a centralized, kid-curated calendar of creative maker workshops.",
      whatItDoes: "A fast, responsive web directory indexing local youth maker events, coding hackathons, and robotics clubs across Austin, Lakeway, and Lake Travis with real-time category filtering.",
      whyItMatters: "Demonstrates that middle schoolers can build authentic, production-ready web tools that benefit real families in their local community.",
      keyFeatures: [
        "Instant client-side search filtering across titles, neighborhoods, and age ranges",
        "Responsive multi-column grid adapting smoothly from mobile phones to 4K displays",
        "Local storage event bookmarking allowing students to save workshops to their list",
        "High-contrast accessible color scheme adhering to WCAG 2.1 web standards",
      ],
    },
    processSteps: [
      {
        step: "01",
        title: "Local Community Needs Research",
        description: "Surveyed peers and parents to identify the difficulty of finding local weekend tech and robotics workshops.",
        badge: "User Research",
      },
      {
        step: "02",
        title: "Information Architecture & JSON",
        description: "Structured event details into clean schemas with dates, neighborhood tags, age suitability, and pricing.",
        badge: "Data Design",
      },
      {
        step: "03",
        title: "Responsive CSS Grid & Filters",
        description: "Built lightning-fast search filter algorithms and styled clean cards that look beautiful on smartphones.",
        badge: "Frontend Web",
      },
      {
        step: "04",
        title: "Live Cloud Hosting & Launch",
        description: "Published the application to the web and shared the link with Austin homeschooling and GT community groups.",
        badge: "Public Launch",
      },
    ],
    outcomes: [
      { title: "Local Events Listed", value: "35+", description: "Central Texas creative tech workshops and clubs indexed." },
      { title: "Search Latency", value: "<10ms", description: "Instant real-time search results filtering across titles and tags." },
      { title: "Mobile Optimized", value: "100%", description: "Tested across mobile, tablet, and desktop viewports." },
      { title: "Community Reach", value: "Live", description: "Actively shared with Austin parents and school STEM groups." },
    ],
    parentReview: {
      quote:
        "He built a real tool that his friends actually use. Kreators Lab taught him that kids don't have to wait to build useful software.",
      parentName: "Amanda H.",
      location: "Lake Travis Parent",
    },
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
    title: "POLISH",
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
  {
    id: "elementary-ai-explorers",
    title: "Elementary Level: Young AI Explorers (Thursday)",
    category: "after-school",
    dateRange: "August 27 – November 12",
    scheduleDays: "Every Thursdays",
    scheduleTime: "Time: 4:30–5:15 PM",
    classCount: "12 Classes",
    grades: "Grades: K–5",
    regularPrice: "$599",
    promoPrice: "$499",
    savingsBadge: "Save $100",
    image: "/images/programs/elementary-program.jpg",
    ctaText: "Enroll Now",
    description: "Hands-on introduction to creative technology, AI storybooks, and visual coding for young makers.",
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
      "No prior coding experience is required for introductory programs. Advanced cohorts list any specific prerequisites.",
  },
  {
    id: "what-will-they-create",
    question: "What will my child create?",
    answer:
      "Students build original digital projects including playable games, interactive stories, digital animations, and web apps.",
  },
  {
    id: "how-different-from-coding",
    question: "How is Kreators Lab different from a coding class?",
    answer:
      "We focus on student ideas, independent decision-making, paper-first planning, and debugging rather than copying pre-made code tutorials.",
  },
  {
    id: "is-ai-safe",
    question: "Is AI safe for children?",
    answer:
      "Yes. Responsible AI use is foundational. Mentors teach digital safety, prompt guardrails, and how to verify computer outputs critically.",
  },
  {
    id: "what-grades-enroll",
    question: "What grades can enroll?",
    answer:
      "Our programs serve Grades K–8 (ages 7–14). Specific age and grade bands are noted on each program card.",
  },
  {
    id: "online-or-inperson",
    question: "Are classes online or in person?",
    answer:
      "We offer both hands-on in-person day camps and interactive virtual cohorts. Available formats depend on current sessions.",
  },
  {
    id: "where-programs-held",
    question: "Where are programs held?",
    answer:
      "In-person programs are hosted across Austin and Lake Travis locations. Specific venue addresses appear on each program listing.",
  },
  {
    id: "what-to-bring",
    question: "What should my child bring?",
    answer:
      "Laptop and supply requirements vary by cohort and are specified on each program page and registration confirmation.",
  },
];
