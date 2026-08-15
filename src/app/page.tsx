import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects, resumes } from "@/db/schema";
import { ensureSeed } from "@/lib/seed";
import { projectView, resumeView } from "@/lib/serialize";
import type { ProjectView, ResumeView } from "@/lib/types";

import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";
import { AiLab } from "@/components/home/AiLab";
import { Services } from "@/components/home/Services";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureSeed();

  let projectRows: ProjectView[] = [];
  let latestResume: ResumeView | null = null;

  try {
    const [pRows, rRows] = await Promise.all([
      db.select().from(projects).orderBy(projects.sortOrder, desc(projects.createdAt)),
      db
        .select({
          id: resumes.id,
          label: resumes.label,
          originalName: resumes.originalName,
          mimeType: resumes.mimeType,
          sizeKb: resumes.sizeKb,
          createdAt: resumes.createdAt,
        })
        .from(resumes)
        .orderBy(desc(resumes.createdAt))
        .limit(1),
    ]);
    projectRows = pRows.map(projectView);
    latestResume = rRows[0] ? resumeView(rRows[0]) : null;
  } catch (err) {
    console.error("[home] failed to load data:", err);
  }

  return (
    <div className="min-h-screen bg-ink font-body text-cream antialiased">
      <Nav />
      <main>
        <Hero latestResume={latestResume} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects projects={projectRows} />
        <AiLab />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
