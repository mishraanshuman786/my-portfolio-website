import type { Message, Project, Resume } from "@/db/schema";
import type { MessageView, ProjectView, ResumeView } from "@/lib/types";

export function projectView(p: Project): ProjectView {
  return {
    id: p.id,
    title: p.title,
    tagline: p.tagline,
    description: p.description,
    category: p.category,
    techStack: Array.isArray(p.techStack) ? p.techStack : [],
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
    accent: p.accent,
    featured: p.featured,
    sortOrder: p.sortOrder,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export function resumeView(r: Omit<Resume, "data">): ResumeView {
  return {
    id: r.id,
    label: r.label,
    originalName: r.originalName,
    mimeType: r.mimeType,
    sizeKb: r.sizeKb,
    createdAt: r.createdAt.toISOString(),
  };
}

export function messageView(m: Message): MessageView {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    service: m.service,
    body: m.body,
    read: m.read,
    createdAt: m.createdAt.toISOString(),
  };
}
