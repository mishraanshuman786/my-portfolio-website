import { NextResponse } from "next/server";
import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { messages, projects, resumes } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import type { DashboardStats } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [p] = await db.select({ n: count() }).from(projects);
  const [r] = await db.select({ n: count() }).from(resumes);
  const [m] = await db.select({ n: count() }).from(messages);
  const [u] = await db
    .select({ n: count() })
    .from(messages)
    .where(eq(messages.read, false));

  const stats: DashboardStats = {
    projects: p?.n ?? 0,
    resumes: r?.n ?? 0,
    messages: m?.n ?? 0,
    unread: u?.n ?? 0,
  };
  return NextResponse.json(stats);
}
