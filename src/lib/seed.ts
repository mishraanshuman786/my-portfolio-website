import { count } from "drizzle-orm";
import { db } from "@/db";
import { projects, type Project } from "@/db/schema";

const SEED_PROJECTS: Array<Omit<Project, "id" | "createdAt" | "updatedAt">> = [
  {
    title: "mytreks.ai",
    tagline: "Quiz-based learning platform — web + mobile",
    description:
      "A quiz-driven learning platform available as both a web app and a mobile app. Integrated AI features to personalise practice, generate explanations and keep learners engaged across sessions.",
    category: "ai",
    techStack: ["Next.js", "Node.js", "React Native", "LangChain.js", "MongoDB"],
    liveUrl: "https://mytreks.ai",
    repoUrl: null,
    accent: "mint",
    featured: true,
    sortOrder: 0,
  },
  {
    title: "ShipGPT",
    tagline: "Production RAG system over internal documents",
    description:
      "An AI RAG system that ingests, chunks and embeds internal documentation into a vector store, then answers queries with cited context. Built retrieval pipelines, prompt scaffolds and evaluation loops.",
    category: "ai",
    techStack: ["LangChain.js", "Node.js", "Vector DB", "Embeddings", "Express.js"],
    liveUrl: null,
    repoUrl: null,
    accent: "amber",
    featured: true,
    sortOrder: 1,
  },
  {
    title: "HScore",
    tagline: "Share-market analytics platform",
    description:
      "A share market platform with live-style scorecards, watchlists and analytics dashboards. Secure auth, optimised PostgreSQL queries and a fast Next.js front end.",
    category: "web",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS"],
    liveUrl: null,
    repoUrl: null,
    accent: "sky",
    featured: false,
    sortOrder: 2,
  },
  {
    title: "Highmast Marine",
    tagline: "Corporate site for a marine services company",
    description:
      "Responsive marketing website with service catalogues, enquiry capture and CMS-friendly content blocks. Focused on Core Web Vitals and clean semantic markup.",
    category: "web",
    techStack: ["Next.js", "Tailwind CSS", "Node.js"],
    liveUrl: null,
    repoUrl: null,
    accent: "coral",
    featured: false,
    sortOrder: 3,
  },
  {
    title: "Page1Travels",
    tagline: "Travel bookings & packages website",
    description:
      "Travel platform showcasing tour packages with search, filtering and enquiry flows. Integrated REST APIs and payment-ready checkout scaffolding.",
    category: "web",
    techStack: ["Next.js", "Express.js", "MongoDB", "REST APIs"],
    liveUrl: null,
    repoUrl: null,
    accent: "mint",
    featured: false,
    sortOrder: 4,
  },
  {
    title: "Jassal Signs",
    tagline: "Signage business website & catalogue",
    description:
      "Business website with a visual catalogue, quote-request forms and an admin-friendly content structure. Built for speed and easy handoff.",
    category: "web",
    techStack: ["Next.js", "Tailwind CSS", "Node.js"],
    liveUrl: null,
    repoUrl: null,
    accent: "amber",
    featured: false,
    sortOrder: 5,
  },
  {
    title: "Excel Education",
    tagline: "Coaching institute platform",
    description:
      "Education website with course listings, batch schedules and lead capture. Authentication-protected admin area for content updates.",
    category: "web",
    techStack: ["Next.js", "Express.js", "MySQL", "JWT"],
    liveUrl: null,
    repoUrl: null,
    accent: "sky",
    featured: false,
    sortOrder: 6,
  },
];

/** Idempotently seed the projects table on first run. */
export async function ensureSeed(): Promise<boolean> {
  try {
    const [row] = await db.select({ n: count() }).from(projects);
    if ((row?.n ?? 0) > 0) return false;
    await db.insert(projects).values(SEED_PROJECTS);
    return true;
  } catch (err) {
    console.error("[seed] failed to ensure seed data:", err);
    return false;
  }
}
