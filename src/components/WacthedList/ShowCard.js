import React from "react";
import { Link } from "react-router-dom";
import GenreTag from "./GenreTag";

const ShowCard = ({ Title, Year, Poster, Genre, imdbID }) => {
  const genres = Genre.split(",");
  return (
    <li className="my-2 rounded overflow-hidden bg-neutral-100 sm:hover:bg-neutral-50 border shadow sm:hover:shadow-md duration-20">
      <Link to={`/shows/${imdbID}`} className="flex">
        <div className="h-32 rounded overflow-hidden flex-shrink-0">
          <img src={Poster} alt={Title} className="h-full" />
        </div>
        <article className="flex flex-col justify-evenly tracking-wide mx-4 w-full">
          <div className="flex items-baseline gap-2 justify-between sm:justify-start">
            <h1 className="text-2xl font-medium ">{Title}</h1>
            <h3 className="text-lg text-neutral-500">{Year}</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {genres.map((genre) => (
              <GenreTag key={genre} genre={genre} />
            ))}
          </div>
        </article>
      </Link>
    </li>
  );
};

export default ShowCard;
