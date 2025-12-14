import React, { ReactNode } from "react";

interface UnderlineHeadingProps {
  children: ReactNode;
}

const CustomUnderline = ({ children }: UnderlineHeadingProps) => {
  return (
    <div className="flex justify-center my-4">
      {/* text-width container */}
      <div className="relative inline-block text-yellow-600">
        {children}

        {/* underline */}
        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-full">
          <div className="h-1 bg-gray-800 rounded flex justify-center">
            <div className="h-1 bg-yellow-600 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomUnderline;
