import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-neutral-400 bg-neutral-800 p-4 text-center tracking-wide">
      <p>Watch Bucket © {year}</p>
    </footer>
  );
};

export default Footer;
