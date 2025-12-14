"use client";
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaDribbble, FaBehance, FaTwitter, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="background-gradient  text-white py-24">
      {/* Section Heading */}
      <div className="container mx-auto text-center mb-12">
        <h4 className="text-sm tracking-widest text-yellow-500 uppercase">CONTACT ME</h4>
        <h2 className="text-4xl font-bold mt-2">CONTACT ME</h2>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Form */}
        <div className="lg:w-1/2">
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
              placeholder="Your Subject"
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
        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
          <p className="text-gray-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ligula nulla tincidunt id faucibus sed suscipit feugiat.
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start gap-4">
              <FaEnvelope className="w-6 h-6 text-yellow-500 mt-1"/>
              <div>
                <h4 className="font-semibold">Email</h4>
                <div className="text-gray-300">
                  <a href="mailto:devis@example.com">devis@example.com</a><br/>
                  <a href="mailto:info@support.com">info@support.com</a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="w-6 h-6 text-yellow-500 mt-1"/>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <div className="text-gray-300">
                  <span>+1 876-369-9009</span><br/>
                  <span>+1 213-519-1786</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="w-6 h-6 text-yellow-500 mt-1"/>
              <div>
                <h4 className="font-semibold">Address</h4>
                <div className="text-gray-300">
                  2661 High Meadow Lane Bear Creek, <br />Olancha, KY 93544
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6">
            <p className="mb-2 text-gray-400">Visit my social profile and get connected</p>
            <div className="flex gap-4 flex-wrap">
              <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition">
                <FaDribbble className="w-5 h-5 text-pink-500"/> Dribbble
              </a>
              <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition">
                <FaBehance className="w-5 h-5 text-blue-500"/> Behance
              </a>
              <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition">
                <FaTwitter className="w-5 h-5 text-blue-400"/> Twitter
              </a>
              <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition">
                <FaLinkedin className="w-5 h-5 text-blue-600"/> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
