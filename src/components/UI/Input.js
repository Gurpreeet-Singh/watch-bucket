import React from "react";

const Input = ({
  type,
  label,
  id,
  value,
  onChange,
  className,
  style,
  onClick,
  onFocus,
}) => {
  return (
    <div className="my-10">
      <label htmlFor={id} className="font-medium tracking-wide">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        style={style}
        onClick={onClick}
        onFocus={onFocus}
        className={`text-lg bg-neutral-100 px-4 py-2 tracking-wide rounded-md focus-visible:border-yellow-500 outline-0 w-full shadow-sm border  hover:border-yellow-500 duration-200 ${className}`}
      />
    </div>
  );
};

export default Input;
