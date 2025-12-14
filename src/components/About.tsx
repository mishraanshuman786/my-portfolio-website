import React from "react";
import CustomUnderline from "./ui/CustomUnderline";
import Link from "next/link";


const About = () => {
  return (
    <section id="about" className="relative py-24 lg:py-20">
      {/* Section Heading */}
      <div className="container mx-auto text-center mb-10">
        <CustomUnderline>
          <h4 className="text-sm tracking-widest text-gray-500 uppercase">
            ABOUT ME
          </h4>
        </CustomUnderline>
        <h2 className="text-4xl lg:text-5xl font-bold mt-4">
          ABOUT ME
        </h2>
      </div>

      {/* Content */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <div className="w-full max-w-md rounded overflow-hidden shadow-lg">
            <div
              className="w-full h-96 bg-cover bg-center rounded"
              style={{ backgroundImage: "url('/man.jpg')" }}
            />
          </div>
        </div>

        {/* Right Text */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-2">
            Hi There! I'm Anshuman Mishra
          </h2>
          <h4 className="text-lg text-yellow-500 mb-4">Full Stack MERN Developer</h4>
          <p className="text-gray-500 mb-6">
            I am a Full Stack MERN Developer with experience in building
            scalable web applications. I also have knowledge in generative AI,
            including RAG systems, LangChain, and vector databases.
            I focus on creating efficient and impactful solutions with modern
            technologies.
          </p>

        <ul className="flex flex-col gap-2 mb-6 text-gray-500">
  <li className="flex gap-2">
    <span className="font-semibold">Phone:</span>
    <span>7706087842</span>
  </li>
  <li className="flex gap-2">
    <span className="font-semibold">Email:</span>
    <span>mishraanshuman146@gmail.com</span>
  </li>
  <li className="flex gap-2">
    <span className="font-semibold">Location:</span>
    <span>Noida, Uttar Pradesh, India</span>
  </li>
  <li className="flex gap-2">
    <span className="font-semibold">Languages:</span>
    <span>English, Hindi</span>
  </li>
  <li className="flex gap-2">
    <span className="font-semibold">Freelance:</span>
    <span>Available</span>
  </li>
</ul>


          <Link
            href="#"
            className="w-40 px-6 py-3 bg-yellow-500 text-black-100 font-semibold rounded-3xl hover:bg-yellow-600 transition"
          >
            Download CV
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
