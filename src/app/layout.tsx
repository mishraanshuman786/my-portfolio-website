import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anshuman Mishra — Full Stack MERN + AI Engineer",
  description:
    "Full Stack Developer (2.5+ yrs) building scalable web, mobile and desktop products with React, Next.js, Node.js, NestJS — plus RAG systems, LangChain.js and MCP servers for AI-driven products.",
  keywords: [
    "MERN Stack Developer",
    "Next.js",
    "NestJS",
    "React Native",
    "RAG",
    "LangChain",
    "Full Stack Developer Noida",
  ],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230a0f0d'/%3E%3Ctext x='50' y='70' font-size='60' text-anchor='middle' fill='%23ffb224' font-family='monospace' font-weight='bold'%3EA%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0f0d",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink text-cream antialiased">{children}</body>
    </html>
  );
}
