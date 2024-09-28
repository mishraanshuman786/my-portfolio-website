import React from "react";
import { Spotlight } from "./ui/spotlight";
import { GridBackgroundDemo } from "./ui/gridBackgroundDemo";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw] "
          fill="purple"
        />
        <Spotlight
          className="top-28 80left-10 h-[80vh] w-[50vw] "
          fill="blue"
        />
      </div>
      <GridBackgroundDemo />
    </div>
  );
};

export default Hero;
