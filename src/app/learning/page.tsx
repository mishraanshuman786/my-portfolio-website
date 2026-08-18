import Link from "next/link";

import { getRepositoryTree } from "@/lib/github";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";


export default async function LearningPage() {
  const repository = await getRepositoryTree();

  const tree = repository.tree;

  const categories = tree.filter(
    (item) =>
      item.type === "tree" &&
      !item.path.includes("/")
  );

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="lg:sticky lg:top-28 lg:self-start">

          {/* Heading */}
          <Reveal>
            <SectionHeading
              index="8"
              kicker="learning"
              title={
                <>
                  LEARNING / NOTES
                  <br />
                  <span className="text-amber">
                    Things I'm Learning
                  </span>
                </>
              }
              description="Notes, concepts, experiments and lessons from my day-to-day development journey."
            />
          </Reveal>

          {/* Categories */}
          <Reveal delay={120}>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 md:gap-6">
              {categories.map((category) => {
                const categoryName =
                  category.path.split("/").pop() ?? "";

                return (
                  <Link
                    key={category.path}
                    href={`/learning/${category.path
                      .split("/")
                      .map(encodeURIComponent)
                      .join("/")}`}
                    className="
                      group
                      block
                      w-full
                      border
                      border-zinc-800
                      p-5
                      transition-all
                      duration-300
                      hover:border-zinc-600
                      sm:p-6
                    "
                  >
                    <p className="text-xs uppercase tracking-wider text-zinc-500 sm:text-sm">
                      Category
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-4">
                      <h2 className="min-w-0 break-words text-xl font-semibold capitalize sm:text-2xl">
                        {categoryName.replace(/-/g, " ")}
                      </h2>

                      <span className="shrink-0 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Reveal>

        </div>
      </div>

    
    </main>
  );
}