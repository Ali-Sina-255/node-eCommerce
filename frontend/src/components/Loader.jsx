import React from "react";

const Loader = ({ type = "spinner", size = "medium", fullScreen = false }) => {
  const sizes = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-2",
    large: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const containerClass = fullScreen
    ? "fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-90 z-50"
    : "flex justify-center items-center";

  if (type === "dots") {
    return (
      <div className={containerClass}>
        <div className="flex space-x-2">
          <div
            className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (type === "large") {
    return (
      <div className={containerClass}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  // Default spinner
  return (
    <div className={containerClass}>
      <div
        className={`${sizes[size]} animate-spin rounded-full border-t-indigo-600 border-b-indigo-600 border-gray-200`}
      ></div>
    </div>
  );
};

export default Loader;
