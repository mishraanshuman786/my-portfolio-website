const GITHUB_API="https://api.github.com";

const owner=process.env.GITHUB_OWNER!;
const repo=process.env.GITHUB_REPO!;
const branch=process.env.GITHUB_BRANCH || "main";
const token=process.env.GITHUB_TOKEN!;

const headers={
    Accept:"application/vnd.github+json",
    Authorization:`Bearer ${token}`,
    "X-GitHub-Api-Version":"2026-03-10"
};

export type GitTreeItem = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
};


// get Github Repository Tree
export async function getRepositoryTree(): Promise<{
  tree: GitTreeItem[];
  truncated: boolean;
}>
 {
  // First get the branch
  const branchResponse = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/branches/${branch}`,
    {
      headers,
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!branchResponse.ok) {
    throw new Error("Failed to fetch GitHub branch");
  }

  const branchData = await branchResponse.json();

  const treeSha = branchData.commit.commit.tree.sha;

  // Then get the entire tree recursively
  const response = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`,
    {
      headers,
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repository tree");
  }

  return response.json();
}

export async function getMarkdownContent(path: string) {
  const response = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    {
      headers,
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch markdown file");
  }

  const data = await response.json();

  const content = Buffer.from(
    data.content,
    "base64"
  ).toString("utf-8");

  return {
    content,
    sha: data.sha,
    name: data.name,
    path: data.path,
  };
}