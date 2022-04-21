import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const WatchedListCard = ({ id, ownerName, watchedList }) => {
  const { user } = useAuthContext();
  const sliceWatchedList = watchedList.slice(0, 3);

  if (watchedList.length === 0 || (user && user.uid === id)) return;

  return (
    <li className="overflow-hidden rounded bg-neutral-100 hover:shadow-md shadow sm:hover:scale-105 duration-200">
      <Link to={`/watched-lists/${id}`}>
        <h2 className="text-xl font-medium py-2 px-4">
          {ownerName}'s Watched List
        </h2>
        <ul className="grid grid-cols-3 gap-x-1 gap-y-2 items-stretch px-4 pb-4">
          {sliceWatchedList.map(({ id, Title, Poster }) => (
            <li key={Title} className="overflow-hidden rounded">
              <article className="relative h-full">
                <div>
                  <img src={Poster} alt={Title} />
                </div>
                <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black">
                  <h2 className=" text-sm text-neutral-200 font-medium tracking-wider absolute bottom-0 p-2">
                    {Title}
                  </h2>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
};

export default WatchedListCard;
