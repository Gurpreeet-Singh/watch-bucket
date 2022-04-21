import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import useAuthContext from "../hooks/useAuthContext";
import GenreTag from "../components/WacthedList/GenreTag";

const SingleShow = () => {
  const { title } = useParams();
  const [show, setShow] = useState(null);
  const { user } = useAuthContext(false);
  const [existed, setExisted] = useState(false);
  const [checkExisted, setCheckExisted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShow = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_APIKEY}&t=${title}`
      );
      const data = await res.json();
      if (!data) return console.log("Wrong ID");
      if (data.Response === "False") return console.log(data.Error);
      setShow(data);
    };
    fetchShow();
  }, [title]);

  useEffect(() => {
    const checkExist = async () => {
      setCheckExisted(false);
      if (!user || !show) setExisted(false);
      else {
        const docRef = doc(db, "watchedLists", user.uid);
        const docSnap = await getDoc(docRef);
        const watchedList = docSnap.data().watchedList;
        const existShow = watchedList.find((item) => item.Title === show.Title);
        if (existShow) setExisted(true);
      }
      setCheckExisted(true);
    };
    checkExist();
  }, [user, show]);

  if (!show) return;

  const { Title, Poster, Year, Genre, Runtime, Rated, Plot, Actors, Language } =
    show;
  const genres = Genre.split(",");

  const handleClick = async () => {
    if (!user) return navigate("/login");
    const docRef = doc(db, "watchedLists", user.uid);
    const docSnap = await getDoc(docRef);
    let watchedList = docSnap.data().watchedList;
    if (existed) return;
    watchedList = [{ Title, Poster, Year, Genre }, ...watchedList];
    await updateDoc(docRef, { watchedList });
    setExisted(true);
  };

  return (
    <section className="my-10 px-4 max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold tracking-wide">{Title}</h1>
      <div className="text-xl text-neutral-500 my-4 divide-x-2 divide-neutral-500 -ml-4">
        {[Year, Runtime, Rated].map((item) => (
          <span key={item} className="px-4">
            {item}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 my-4">
        {genres.map((genre) => (
          <GenreTag key={genre} genre={genre} />
        ))}
      </div>
      <div className="sm:grid grid-cols-5 grid-rows-6 items-start gap-x-12 my-7">
        {checkExisted && (
          <Button
            className={`w-full sm:w-auto mb-8 h-[44px] col-span-3 col-start-3 sm:mb-0 ${
              existed &&
              "cursor-not-allowed bg-neutral-300 hover:bg-neutral-300 "
            }`}
            onClick={handleClick}
          >
            {existed ? "Added" : "Add"} to Watched
          </Button>
        )}

        <div className="rounded overflow-hidden row-start-1 row-span-6 col-span-2">
          <img src={Poster} alt={Title} className="w-full" />
        </div>
        <div className="col-start-3 row-span-5 row-start-2 col-span-3 tracking-wide text-lg mt-10 sm:mt-0">
          <p>{Plot}</p>
          <div className="flex my-8 gap-4">
            <h5 className="font-medium">Starring</h5>
            <h5>{Actors}</h5>
          </div>
          <div className="flex my-8 gap-4">
            <h5 className="font-medium">Language</h5>
            <h5>{Language}</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleShow;
