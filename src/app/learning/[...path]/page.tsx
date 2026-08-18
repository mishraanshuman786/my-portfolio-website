import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getRepositoryTree,
  getMarkdownContent,
} from "@/lib/github";

import { MarkdownRenderer } from "@/components/learning/MarkdownRenderer";

type TreeItem = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
};

type Props = {
  params: Promise<{
    path: string[];
  }>;
};

export default async function LearningPathPage({
  params,
}: Props) {
  const { path } = await params;

  const requestedPath = path.join("/");

  const repository = await getRepositoryTree();

  const tree: TreeItem[] = repository.tree;

  /*
   * --------------------------------------------------
   * Check if requested path is a Markdown file
   * --------------------------------------------------
   *
   * Example:
   *
   * /learning/ai/langchain
   *
   * becomes:
   *
   * ai/langchain
   *
   * and we look for:
   *
   * ai/langchain.md
   */

  const markdownItem = tree.find(
    (item) =>
      item.type === "blob" &&
      item.path === `${requestedPath}.md`
  );

  if (markdownItem) {
    const file = await getMarkdownContent(
      markdownItem.path
    );

    const parentPath =
      path.length > 1
        ? `/learning/${path
            .slice(0, -1)
            .map(encodeURIComponent)
            .join("/")}`
        : "/learning";

    return (
      <main className="min-h-screen px-6 py-20">
        <div className="mx-auto max-w-5xl">

          <Link
            href={parentPath}
            className="mb-8 inline-block text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back
          </Link>

          <MarkdownRenderer content={file.content} />

        </div>
      </main>
    );
  }

  /*
   * --------------------------------------------------
   * Check if requested path is a directory
   * --------------------------------------------------
   */

  const directoryItem = tree.find(
    (item) =>
      item.type === "tree" &&
      item.path === requestedPath
  );

  if (directoryItem) {
    const prefix = `${requestedPath}/`;

    /*
     * Get only direct children.
     *
     * Example:
     *
     * ai/
     * ├── langchain.md
     * ├── rag/
     * │   └── basics.md
     * └── agents.md
     *
     * We show:
     *
     * langchain.md
     * rag/
     * agents.md
     *
     * but NOT:
     *
     * rag/basics.md
     */

    const children = tree.filter((item) => {
      if (!item.path.startsWith(prefix)) {
        return false;
      }

      const remainingPath = item.path.slice(
        prefix.length
      );

      return (
        remainingPath.length > 0 &&
        !remainingPath.includes("/")
      );
    });

    return (
      <main className="min-h-screen px-6 py-20">
        <div className="mx-auto max-w-5xl">

          <Link
            href={
              path.length > 1
                ? `/learning/${path
                    .slice(0, -1)
                    .map(encodeURIComponent)
                    .join("/")}`
                : "/learning"
            }
            className="mb-8 inline-block text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back
          </Link>

          <h1 className="text-4xl font-bold capitalize">
            {path[path.length - 1].replace(/-/g, " ")}
          </h1>

          <div className="mt-10 grid gap-4">
            {children.map((child) => {
              const childPath = child.path
                .replace(/\.md$/, "")
                .split("/")
                .map(encodeURIComponent)
                .join("/");

              const name =
                child.path
                  .split("/")
                  .pop()
                  ?.replace(/\.md$/, "")
                  .replace(/-/g, " ") ?? "";

              return (
                <Link
                  key={child.path}
                  href={`/learning/${childPath}`}
                  className="block border border-zinc-800 p-5 transition hover:border-zinc-600"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500">
                        {child.type === "tree"
                          ? "Folder"
                          : "Note"}
                      </p>

                      <h2 className="mt-2 text-xl font-semibold capitalize">
                        {name}
                      </h2>
                    </div>

                    <span className="text-zinc-500">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  notFound();
}