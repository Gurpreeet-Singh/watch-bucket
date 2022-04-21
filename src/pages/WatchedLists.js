import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import useAuthContext from "../hooks/useAuthContext";
import WatchedListCard from "../components/WacthedList/WatchedListCard";

const WatchedLists = () => {
  const { user } = useAuthContext();
  const [watchedLists, setWatchedLists] = useState([]);

  useEffect(() => {
    const getwatchedLists = async () => {
      const ref = collection(db, "watchedLists");
      const querySnapshot = await getDocs(ref);
      let data = [];
      querySnapshot.docs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setWatchedLists(data);
    };
    getwatchedLists();
  }, []);

  return (
    <section className="sm:text-left px-4 max-w-screen-md md:mx-auto my-10">
      <h1 className="text-4xl font-bold tracking-wide">
        Hello {(user && user.displayName) || "Watcher"}
      </h1>
      <h3 className="text-2xl font-medium tracking-wide my-6 ">
        See what other people have watched
      </h3>
      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
        {watchedLists.map((watchedList) => (
          <WatchedListCard key={watchedList.id} {...watchedList} />
        ))}
      </ul>
    </section>
  );
};

export default WatchedLists;
