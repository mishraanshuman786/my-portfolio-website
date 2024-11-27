"use client";

import { useRef, useEffect, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Resume({ isVisible, setIsVisible }) {
  const overlayRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Determine if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile if width is 768px or less
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close overlay when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setIsVisible(false); // Close overlay
      }
    }
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, setIsVisible]);

  // Render overlay only when isVisible is true
  if (!isVisible) return null;

  // Common styling for the overlay
  const overlayStyles = "bg-white rounded-lg shadow-lg p-4";

  // Close button styling
  const closeButton = (
    <button
      onClick={() => setIsVisible(false)} // Close overlay
      className="mt-4 text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
    >
      Close
    </button>
  );

  // Mobile PDF viewer content
  const mobileContent = (
    <div ref={overlayRef} className={`${overlayStyles} w-[80vw] h-[70vh]`}>
      {/* Worker for PDF.js */}
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        {/* Wrapper for PDF viewer with scrollbar */}
        <div
          className="h-[80vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          style={{
            scrollbarWidth: "medium",
            scrollbarColor: "#d1d5db #f3f4f6", // Custom scrollbar for Firefox
          }}
        >
          <Viewer fileUrl="/RESUME.pdf" />
        </div>
      </Worker>

      {closeButton}
    </div>
  );

  // Desktop PDF viewer content
  const desktopContent = (
    <div
      ref={overlayRef}
      className={`${overlayStyles} w-[80vw] h-[80vh] max-w-4xl`}
    >
      {/* Embed PDF for desktop */}
      <embed
        src="/RESUME.pdf"
        type="application/pdf"
        className="w-full h-full"
      />

      {closeButton}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {isMobile ? mobileContent : desktopContent}
    </div>
  );
}
