import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { resumeView } from "@/lib/serialize";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = new Map<string, string>([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "docx",
  ],
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
]);

export async function GET() {
  const rows = await db
    .select({
      id: resumes.id,
      label: resumes.label,
      originalName: resumes.originalName,
      mimeType: resumes.mimeType,
      sizeKb: resumes.sizeKb,
      createdAt: resumes.createdAt,
    })
    .from(resumes)
    .orderBy(desc(resumes.createdAt));
  return NextResponse.json(rows.map(resumeView));
}

export async function POST(req: Request) {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "A resume file is required" }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "File is empty" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds the 5 MB limit" }, { status: 413 });
  }

  const mime = ALLOWED.has(file.type) ? file.type : "";
  if (!mime) {
    return NextResponse.json(
      { error: "Unsupported file type. Use PDF, DOC, DOCX or an image." },
      { status: 415 }
    );
  }

  const labelField = form.get("label");
  const label =
    typeof labelField === "string" && labelField.trim()
      ? labelField.trim().slice(0, 80)
      : file.name.replace(/\.[^.]+$/, "");

  const buffer = Buffer.from(await file.arrayBuffer());

  const [row] = await db
    .insert(resumes)
    .values({
      label,
      originalName: file.name,
      mimeType: mime,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      data: buffer,
    })
    .returning({
      id: resumes.id,
      label: resumes.label,
      originalName: resumes.originalName,
      mimeType: resumes.mimeType,
      sizeKb: resumes.sizeKb,
      createdAt: resumes.createdAt,
    });

  return NextResponse.json(resumeView(row), { status: 201 });
}
