import React from "react";

const Input = ({ type, label, id, value, onChange, className }) => {
  return (
    <div className="my-10">
      <label htmlFor="email" className="font-medium tracking-wide">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className={`text-lg bg-neutral-100 px-4 py-2 my-1 tracking-wide rounded border border-neutral-400 hover:border-yellow-500 focus-visible:outline-yellow-500 focus-visible:border-yellow-500 w-full ${className}`}
      />
    </div>
  );
};

export default Input;
