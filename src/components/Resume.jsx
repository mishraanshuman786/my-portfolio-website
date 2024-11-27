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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={overlayRef}
        className={`bg-white rounded-lg shadow-lg p-4 ${
          isMobile ? "w-[80vw] h-[70vh]" : "w-[80vw] h-[80vh] max-w-4xl"
        }`}
      >
        {/* Worker for PDF.js */}
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          {/* Wrapper for PDF viewer with scrollbar */}
          <div
            className={`h-full overflow-y-scroll ${
              isMobile
                ? "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                : ""
            }`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db #f3f4f6", // Custom scrollbar for Firefox
            }}
          >
            <Viewer fileUrl="/RESUME.pdf" />
          </div>
        </Worker>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)} // Close overlay
          className="mt-4 text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
