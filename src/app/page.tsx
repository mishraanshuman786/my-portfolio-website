import Hero from "@/components/Hero";
import Grid from "@/components/Grid";

import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function Home() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "About",
      link: "#",
    },
    {
      name: "Contact",
      link: "#",
    },
  ];

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5  ">
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={navItems}
          className="m-auto bg-gradient-to-r from-[#04071d] to-[#0c0e23]  px-4 py-4"
        ></FloatingNav>
        <div id="home">
          <Hero />
        </div>

        <Grid />
        <div id="projects">
          <RecentProjects />
        </div>
      </div>
    </main>
  );
}
