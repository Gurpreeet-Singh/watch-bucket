import React from "react";

const Button = ({ type, className, children, onClick }) => {
  return (
    <button
      type={type}
      className={`rounded bg-yellow-400 px-8 py-2 text-xl hover:bg-yellow-500 text-slate-800 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
