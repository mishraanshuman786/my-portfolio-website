import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  customType,
} from "drizzle-orm/pg-core";

/** Binary storage for uploaded resume files (PDF / DOC / DOCX). */
export const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  tagline: text("tagline"),
  description: text("description").notNull(),
  /** web | mobile | desktop | ai */
  category: text("category").notNull().default("web"),
  techStack: jsonb("tech_stack").$type<string[]>().notNull().default([]),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  /** accent key: amber | mint | coral | sky */
  accent: text("accent").notNull().default("amber"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeKb: integer("size_kb").notNull().default(0),
  data: bytea("data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  body: text("body").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type Resume = typeof resumes.$inferSelect;
export type Message = typeof messages.$inferSelect;
