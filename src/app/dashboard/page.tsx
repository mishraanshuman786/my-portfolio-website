import { redirect } from "next/navigation";
import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { messages, projects, resumes } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { messageView, projectView, resumeView } from "@/lib/serialize";
import type { DashboardStats } from "@/lib/types";
import { DashShell } from "@/components/dashboard/DashShell";
import { ProjectsManager } from "@/components/dashboard/ProjectsManager";
import { ResumesManager } from "@/components/dashboard/ResumesManager";
import { MessagesManager } from "@/components/dashboard/MessagesManager";

export const dynamic = "force-dynamic";

type Tab = "projects" | "resumes" | "messages";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await requireUser();
  if (!user) redirect("/login");

  await ensureSeed();

  const sp = await searchParams;
  const tab: Tab =
    sp.tab === "resumes" || sp.tab === "messages" ? sp.tab : "projects";

  const [projectRows, resumeRows, messageRows, unreadRow] = await Promise.all([
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
      .orderBy(desc(resumes.createdAt)),
    db.select().from(messages).orderBy(desc(messages.createdAt)),
    db.select({ n: count() }).from(messages).where(eq(messages.read, false)),
  ]);

  const stats: DashboardStats = {
    projects: projectRows.length,
    resumes: resumeRows.length,
    messages: messageRows.length,
    unread: unreadRow[0]?.n ?? 0,
  };

  return (
    <DashShell tab={tab} stats={stats}>
      {tab === "projects" && <ProjectsManager initial={projectRows.map(projectView)} />}
      {tab === "resumes" && <ResumesManager initial={resumeRows.map(resumeView)} />}
      {tab === "messages" && <MessagesManager initial={messageRows.map(messageView)} />}
    </DashShell>
  );
}
