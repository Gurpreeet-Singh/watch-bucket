import React, { useEffect, useState, useRef } from "react";
import Input from "../components/UI/Input";
import searchIcon from "../assets/search-icon.png";
import { Link } from "react-router-dom";

const Shows = () => {
  const [searchText, setSearchText] = useState("");
  const [shows, setShows] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef(null);
  console.log(shows);

  useEffect(() => {
    let ignore = false;
    if (searchText.trim() === "") {
      return setShows([]);
    }
    const getShows = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_APIKEY}&s=${searchText}`
      );
      const data = await res.json();
      if (data.Response === "False") return;
      if (!ignore) {
        setShows(data.Search.slice(0, 5));
      }
    };
    getShows();
    return () => {
      ignore = true;
    };
  }, [searchText]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (shows.length === 0) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [shows]);

  return (
    <section className="my-10 px-4 max-w-screen-md mx-auto">
      <div ref={ref} className="sm:w-2/3 m-auto relative">
        <form>
          <Input
            style={{
              background: `rgb(245 245 245) url(${searchIcon}) 1rem 0.8rem no-repeat`,
              backgroundSize: "1.6rem",
            }}
            type="text"
            className={`pl-14 leading-8 ${
              showSearch &&
              "border-x-yellow-500 border-t-yellow-500 border-b-0 rounded-b-none"
            }`}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onFocus={() => {
              if (shows.length === 0) return setShowSearch(false);
              setShowSearch((pre) => !pre);
            }}
          />
        </form>

        <ul
          className={`bg-neutral-100 overflow-hidden rounded-b-md absolute top-[49px] w-full duration-200 origin-top border border-t-0 border-x-yellow-500 border-b-yellow-500 ${
            showSearch ? "scale-y-100" : " scale-y-0"
          }`}
        >
          {shows.map(({ Title, imdbID, Year, Poster }, index) => {
            return (
              <li key={index}>
                <Link
                  to={`/shows/${imdbID}`}
                  className="flex gap-5 hover:bg-neutral-300 px-4 py-2 items-center"
                >
                  <div className="h-20 rounded overflow-hidden flex-shrink-0 max-w-[54px]">
                    {Poster === "N/A" ? (
                      <p className="bg-neutral-200 h-full w-full text-center text-sm flex items-center">
                        No image
                      </p>
                    ) : (
                      <img
                        alt={Title}
                        src={Poster}
                        className="h-full w-full object-cover object"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {Title.slice(0, 40)}
                      {Title.length > 40 && "..."}
                    </h3>
                    <h5 className="text-neutral-500">{Year}</h5>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Shows;
