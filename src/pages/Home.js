import useAuthContext from "../hooks/useAuthContext";
import LinkBtn from "../components/UI/LinkBtn";
import hero from "../assets/hero.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/watched-lists");
    }
  });

  return (
    <>
      <section className="text-center sm:text-left">
        <article className="max-w-screen-md mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-wide mt-10">
            Welcome <span className="text-yellow-600">Watcher</span>
          </h1>
          <h3 className="text-2xl font-medium tracking-wide my-6">
            Show your movie history with others
          </h3>
          <div className="flex flex-wrap justify-around sm:justify-start gap-6 sm:w-1/2">
            <LinkBtn
              to="/register"
              className="text-xl border-2 border-yellow-400 bg-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 text-slate-800 flex-grow"
            >
              Register
            </LinkBtn>
            <LinkBtn
              to="/login"
              className="text-xl border-2 border-slate-800 hover:bg-slate-800 hover:text-slate-100 text-slate-800 flex-grow"
            >
              Login
            </LinkBtn>
          </div>
          <p className="font-medium text-lg text-neutral-600 my-4">
            See{" "}
            <Link
              to="/watched-lists"
              className="text-yellow-700 hover:text-yellow-600 "
            >
              Movies History
            </Link>{" "}
            of other people.
          </p>
        </article>
        <div className="h-[calc(100vh-24.5em)] min-h-[10rem] relative">
          <img
            className="object-cover w-full h-full object-left-bottom"
            src={hero}
            alt="Watche Bucket"
          />
          <div className="w-screen absolute h-full top-0 bg-gradient-to-b from-neutral-200" />
        </div>
      </section>
    </>
  );
};

export default Home;
