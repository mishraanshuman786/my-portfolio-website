"use client";

import { useRef, useEffect } from "react";

export default function Resume({ isVisible, setIsVisible }) {
  const overlayRef = useRef(null);

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
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={overlayRef}
        className="bg-white rounded-lg p-6 shadow-lg w-[80vw] h-[80vh] max-w-md"
      >
        <embed
          src="/RESUME.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
        />

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)} // Close overlay
          className="mt-2 rounded-md   text-white border border-white px-4 py-[-2px]  z-20 hover:bg-white hover:text-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
