import { useState } from "react";
import React from "react";
import NavButton from "./NavButton";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const { checkedAuth } = useAuthContext();

  return (
    <header className=" text-neutral-400 sm:bg-neutral-800 sm:pl-[calc(100vw-100%)]">
      <nav className="sm:flex sm:justify-between items-baseline max-w-screen-md mx-auto">
        <div className="flex justify-between items-center py-4 bg-neutral-800 z-10 relative px-4">
          <Link
            to="/"
            className="text-yellow-300 text-3xl font-medium cursor-pointer"
          >
            Watch <span className="text-neutral-200">Bucket</span>
          </Link>
          <NavButton show={showNav} onClick={() => setShowNav((pre) => !pre)} />
        </div>
        {checkedAuth && (
          <NavLinks show={showNav} onClick={() => setShowNav(false)} />
        )}
      </nav>
    </header>
  );
};

export default Header;
