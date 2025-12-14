"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,

  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section
      id="contact"
      className="background-gradient text-white py-24"
      data-aos="fade-up"
    >
      {/* Section Heading */}
      <div
        className="container mx-auto text-center mb-12"
        data-aos="fade-down"
      >
        <h4 className="text-sm tracking-widest text-yellow-500 uppercase">
          Contact
        </h4>
        <h2 className="text-4xl font-bold mt-2">Get In Touch</h2>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Form */}
        <div className="lg:w-1/2" data-aos="fade-right">
          <h3 className="text-2xl font-semibold mb-6">Just say Hello</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="lg:w-1/2 space-y-6" data-aos="fade-left">
          <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
          <p className="text-gray-300 mb-6">
            Feel free to reach out for full-stack development, MERN projects,
            AI-powered applications, or collaboration opportunities.
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start gap-4" data-aos="zoom-in">
              <FaEnvelope className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <a
                  href="mailto:mishraanshuman146@gmail.com"
                  className="text-gray-300"
                >
                  mishraanshuman146@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4" data-aos="zoom-in">
              <FaPhoneAlt className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <span className="text-gray-300">+91 77060 87842</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4" data-aos="zoom-in">
              <FaMapMarkerAlt className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Location</h4>
                <span className="text-gray-300">Noida, India</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6" data-aos="fade-up">
            <p className="mb-2 text-gray-400">
              Connect with me on social platforms
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://www.linkedin.com/in/anshumanwebdev/"
                target="_blank"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition"
              >
                <FaLinkedin className="w-5 h-5 text-blue-600" />
                LinkedIn
              </a>

              <a
                href="https://github.com/mishraanshuman786"
                target="_blank"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition"
              >
                <FaGithub className="w-5 h-5 text-white" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
