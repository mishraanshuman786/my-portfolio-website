"use client";
import React, { useState, useEffect } from "react";
import { Braces } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about-me" },
  
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "black-gradient"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
           <Braces className="w-8 h-8" />
        </div>

        {/* Right: Navigation + Phone */}
        <div className="flex items-center space-x-6">
          {/* Navigation links */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1 font-medium transition ${
                  scrolled ? "text-white hover:text-yellow-500" : "text-white hover:text-yellow-500"
                }`}
              >
               
                {link.name}
              </a>
            ))}
          </nav>

          {/* Phone */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-yellow-500"
              viewBox="0 0 513.64 513.64"
              fill="currentColor"
            >
              <path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z" />
            </svg>
            <span className="text-yellow-500 font-medium">770607842</span>
          </div>

          {/* Hamburger menu toggle */}
          <button
            className="lg:hidden flex flex-col justify-between w-6 h-6"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`h-0.5 w-full bg-white transition-transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden black-gradient min-h-screen text-white shadow-md">
          <nav className="flex flex-col space-y-3 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-yellow-500 font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
