import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, type Project } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { projectView } from "@/lib/serialize";

export const dynamic = "force-dynamic";

const CATEGORIES = new Set(["web", "mobile", "desktop", "ai"]);
const ACCENTS = new Set(["amber", "mint", "coral", "sky"]);

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const patch: Partial<Project> & { updatedAt: Date } = { updatedAt: new Date() };
  if (typeof body.title === "string" && body.title.trim()) patch.title = body.title.trim();
  if (typeof body.description === "string" && body.description.trim())
    patch.description = body.description.trim();
  if (typeof body.tagline === "string")
    patch.tagline = body.tagline.trim() ? body.tagline.trim() : null;
  if (typeof body.category === "string" && CATEGORIES.has(body.category))
    patch.category = body.category;
  if (typeof body.accent === "string" && ACCENTS.has(body.accent))
    patch.accent = body.accent;
  if (Array.isArray(body.techStack))
    patch.techStack = (body.techStack as unknown[])
      .map((t) => String(t).trim())
      .filter(Boolean)
      .slice(0, 20);
  if (typeof body.liveUrl === "string")
    patch.liveUrl = body.liveUrl.trim() ? body.liveUrl.trim() : null;
  if (typeof body.repoUrl === "string")
    patch.repoUrl = body.repoUrl.trim() ? body.repoUrl.trim() : null;
  if (typeof body.featured === "boolean") patch.featured = body.featured;
  if (typeof body.sortOrder === "number" && Number.isFinite(body.sortOrder))
    patch.sortOrder = Math.round(body.sortOrder);

  const [row] = await db
    .update(projects)
    .set(patch)
    .where(eq(projects.id, numId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(projectView(row));
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }
  const [row] = await db.delete(projects).where(eq(projects.id, numId)).returning();
  if (!row) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, id: numId });
}
