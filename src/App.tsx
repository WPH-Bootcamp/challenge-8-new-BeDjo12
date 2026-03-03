import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import MovieDetail from "./Components/Container/MovieDetail/MovieDetail";
import Favorites from "./Components/Container/Favorites/Favorites";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
