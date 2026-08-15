import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { projectView } from "@/lib/serialize";
import { ensureSeed } from "@/lib/seed";

export const dynamic = "force-dynamic";

const CATEGORIES = new Set(["web", "mobile", "desktop", "ai"]);
const ACCENTS = new Set(["amber", "mint", "coral", "sky"]);

export async function GET() {
  await ensureSeed();
  const rows = await db
    .select()
    .from(projects)
    .orderBy(projects.sortOrder, desc(projects.createdAt));
  return NextResponse.json(rows.map(projectView));
}

export async function POST(req: Request) {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }

  const category =
    typeof body.category === "string" && CATEGORIES.has(body.category)
      ? body.category
      : "web";
  const accent =
    typeof body.accent === "string" && ACCENTS.has(body.accent)
      ? body.accent
      : "amber";
  const techStack = Array.isArray(body.techStack)
    ? (body.techStack as unknown[]).map((t) => String(t).trim()).filter(Boolean).slice(0, 20)
    : [];

  const [row] = await db
    .insert(projects)
    .values({
      title,
      description,
      tagline:
        typeof body.tagline === "string" && body.tagline.trim()
          ? body.tagline.trim()
          : null,
      category,
      techStack,
      liveUrl:
        typeof body.liveUrl === "string" && body.liveUrl.trim()
          ? body.liveUrl.trim()
          : null,
      repoUrl:
        typeof body.repoUrl === "string" && body.repoUrl.trim()
          ? body.repoUrl.trim()
          : null,
      accent,
      featured: body.featured === true,
      sortOrder:
        typeof body.sortOrder === "number" && Number.isFinite(body.sortOrder)
          ? Math.round(body.sortOrder)
          : 99,
    })
    .returning();

  return NextResponse.json(projectView(row), { status: 201 });
}
