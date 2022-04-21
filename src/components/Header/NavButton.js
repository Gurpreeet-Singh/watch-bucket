import React from "react";

const NavButton = ({ show, onClick }) => {
  return (
    <button className="sm:hidden" onClick={onClick}>
      <div
        className={`w-8 h-1  bg-neutral-200 duration-200 ${
          show && "rotate-45 translate-y-3"
        }`}
      />
      <div
        className={`w-8 h-1 my-2 bg-neutral-200  duration-200 ${
          show && "rotate-45"
        }`}
      />
      <div
        className={`w-8 h-1 bg-neutral-200 duration-200 ${
          show && "-rotate-45 -translate-y-3"
        }`}
      />
    </button>
  );
};

export default NavButton;
