import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WatchedLists from "./pages/WatchedLists";
import SingleWatchedList from "./pages/SingleWatchedList";
import SingleShow from "./pages/SingleShow";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { checkedAuth } = useAuthContext();

  return (
    <div className="bg-neutral-200 min-h-screen text-neutral-800 flex flex-col">
      <Header />
      <main className="flex-grow sm:pl-[calc(100vw-100%)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watched-lists" element={<WatchedLists />} />
          <Route
            path="/watched-lists/:id"
            element={checkedAuth ? <SingleWatchedList /> : <div />}
          />
          <Route path="/shows/:title" element={<SingleShow />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
