import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const NavLinks = ({ show, onClick }) => {
  const links = [
    { name: "Home", url: "/", showLogin: true, showLogout: true },
    { name: "Search", url: "/shows", showLogin: true, showLogout: true },
    { name: "Login", url: "/login", showLogin: false, showLogout: true },
    { name: "Register", url: "/register", showLogin: false, showLogout: true },
    {
      name: "My List",
      url: "watched-lists/me",
      showLogin: true,
      showLogout: false,
    },
  ];

  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const hadleClick = async () => {
    onClick();
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul
      className={`absolute w-full text-center bg-neutral-800 duration-200 ${
        show ? "translate-y-0" : "-translate-y-60 sm:translate-y-0"
      } sm:static sm:w-auto sm:flex gap-6 tracking-wide sm:px-4`}
    >
      {links.map(
        ({ name, url, showLogin, showLogout }) =>
          (!!user === showLogin || !user === showLogout) && (
            <li
              key={name}
              className="cursor-pointer hover:bg-neutral-700 sm:hover:bg-transparent hover:text-neutral-200 sm:p-0"
              onClick={onClick}
            >
              <Link to={url} className="py-3 block">
                {name}
              </Link>
            </li>
          )
      )}
      {user && (
        <li className="cursor-pointer hover:bg-neutral-700 sm:hover:bg-transparent hover:text-neutral-200 sm:p-0">
          <button className="py-3" onClick={hadleClick}>
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
