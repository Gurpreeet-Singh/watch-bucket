import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ShowCard from "../components/WacthedList/ShowCard";
import useAuthContext from "../hooks/useAuthContext";

const SingleWatchedList = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [userList, setUserList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let listId = id;
    if (listId === "me") {
      if (!user) return navigate("/login");
      listId = user.uid;
    }
    const getUserList = async () => {
      const docRef = doc(db, "watchedLists", listId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserList(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getUserList();
  }, [id, navigate, user]);

  if (!userList) return;

  const { ownerName, watchedList } = userList;

  return (
    <section className="sm:text-left px-4 max-w-screen-md mx-auto my-10">
      <h1 className="text-4xl font-bold tracking-wide my-10">
        {ownerName}'s Watched List
      </h1>
      <ul>
        {watchedList.length === 0 && (
          <p className="text-center text-lg text-neutral-600">
            Empty Watchlist
          </p>
        )}
        {watchedList.map((show) => (
          <ShowCard key={show.Title} {...show} />
        ))}
      </ul>
    </section>
  );
};

export default SingleWatchedList;
