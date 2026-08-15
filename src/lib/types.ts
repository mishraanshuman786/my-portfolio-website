/** Serializable view models passed from server components to client components. */

export interface ProjectView {
  id: number;
  title: string;
  tagline: string | null;
  description: string;
  category: string;
  techStack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  accent: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeView {
  id: number;
  label: string;
  originalName: string;
  mimeType: string;
  sizeKb: number;
  createdAt: string;
}

export interface MessageView {
  id: number;
  name: string;
  email: string;
  service: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  projects: number;
  resumes: number;
  messages: number;
  unread: number;
}
