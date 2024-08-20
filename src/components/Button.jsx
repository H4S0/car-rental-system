import React from "react";

const Button = ({ children }) => {
  return (
    <button className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg hover:bg-sky-600 transition-colors duration-300 ">
      {children}
    </button>
  );
};

export default Button;
