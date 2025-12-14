"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24">
      {/* Section Heading */}
      <div className="container mx-auto text-center mb-10 sm:mb-12 px-4">
        <h4 className="text-xs sm:text-sm tracking-widest text-yellow-500 uppercase" data-aos="fade-down">
          About
        </h4>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2" data-aos="fade-up" data-aos-delay="100">
          About Me
        </h2>
      </div>

      {/* Content */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-24 px-4">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start" data-aos="fade-right" data-aos-delay="200">
          <div className="w-full max-w-xs sm:max-w-md rounded overflow-hidden shadow-lg">
            <div
              className="w-full h-64 sm:h-80 lg:h-96 bg-cover bg-center rounded"
              style={{ backgroundImage: "url('/man.jpg')" }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left" data-aos="fade-left" data-aos-delay="400">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
            Hi There! I&apos;m Anshuman Mishra
          </h2>

          <h4 className="text-base sm:text-lg text-yellow-500 mb-4">
            Full Stack MERN + AI Developer
          </h4>

          <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed">
            I am a Full Stack MERN Developer with experience in building scalable
            web applications. I also have hands-on knowledge in Generative AI,
            including RAG systems, LangChain, and vector databases. I focus on
            creating efficient, impactful, and future-ready solutions using
            modern technologies.
          </p>

          {/* Info List */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mb-6 text-gray-500 text-sm sm:text-base">
            <li>
              <span className="font-semibold">Phone:</span> 7706087842
            </li>
            <li>
              <span className="font-semibold">Email:</span>{" "}
              mishraanshuman146@gmail.com
            </li>
            <li>
              <span className="font-semibold">Location:</span> Noida, India
            </li>
            <li>
              <span className="font-semibold">Languages:</span> English, Hindi
            </li>
            <li>
              <span className="font-semibold">Freelance:</span> Available
            </li>
          </ul>

          {/* Button */}
          <Link
            href="#"
            className="w-full sm:w-48 text-center px-6 py-3 bg-yellow-500 text-black-100 font-semibold rounded-3xl hover:bg-yellow-600 transition"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            Download CV
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
