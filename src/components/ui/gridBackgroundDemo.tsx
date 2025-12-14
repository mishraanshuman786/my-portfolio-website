"use client";
import React, { useState, useEffect } from "react";
import { TextGenerateEffect } from "./text-generate-effect";
import { Button } from "./moving-border";
import Resume from "../Resume.jsx";
import { useRouter } from "next/navigation";

import { FaCopy } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";

import AOS from "aos";
import "aos/dist/aos.css";

export function GridBackgroundDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useRouter();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="h-[24rem] flex-col w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.008] relative flex items-center justify-center">
      {/* Radial gradient for the container */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Hero Text */}
      <p
        data-aos="fade-down"
        className="text-4xl text-center sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pb-4"
      >
        Developing Websites with MERN & Next.js
      </p>

      <TextGenerateEffect
        data-aos="fade-up"
        className="text-center text-[40px] md:text-5xl lg:text-6xl pb-4"
        words="Transforming Concepts into Seamless User Experiences."
      />

      <p
        data-aos="fade-up"
        data-aos-delay="200"
        className="text-center text-sm md:text-lg lg:text-2xl md:tracking-wider pb-4"
      >
        Hi, I am Anshuman Mishra, Full Stack Developer.
      </p>

      {/* Buttons */}
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="flex flex-col md:flex-row gap-4"
      >
        <Button
          className="md:text-[16px] text-sm bg-black-100 hover:underline font-semibold"
          borderRadius="8px"
          onClick={() => setIsVisible(true)}
        >
          Resume
          <FaCopy className="text-white ml-1 md:text-[24px]" />
        </Button>

        <Button
          className="md:text-[16px] text-sm bg-black-100 hover:underline font-semibold"
          borderRadius="8px"
          onClick={() =>
            navigation.push("https://github.com/mishraanshuman786")
          }
        >
          Github
          <FaSquareGithub className="text-white ml-1 md:text-[24px]" />
        </Button>

        <Button
          className="md:text-[16px] text-sm bg-black-100 hover:underline font-semibold"
          borderRadius="8px"
          onClick={() =>
            navigation.push("https://www.linkedin.com/in/anshumanwebdev/")
          }
        >
          LinkedIn
          <BsLinkedin className="text-white ml-1 md:text-[24px]" />
        </Button>

        {/* Resume Overlay */}
        <Resume isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
    </div>
  );
}
