import React from "react";
import { Link } from "react-router-dom";

const LinkBtn = ({ children, className, to }) => {
  return (
    <Link to={to} className={`rounded px-8 py-2 text-center ${className}`}>
      {children}
    </Link>
  );
};

export default LinkBtn;
