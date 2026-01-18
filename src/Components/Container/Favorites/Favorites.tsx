import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../../types/movie";
import { GoHeartFill } from "react-icons/go";
import WatchTrailer from "../../ui/Button/WatchTrailer";
import HeaderFavorites from "./HeaderFavorites";
import Footer from "../Footer/Footer";
import VirtualKeyboard from "../Header/VirtualKeyboard";
import Empety from "/Frame52.svg";
import Notfound from "/Frame53.svg";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigate = useNavigate();

  /* ================= FILTER OTOMATIS ================= */
  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= NAVIGASI KEYBOARD ================= */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && filteredFavorites[focusedIndex]) {
        navigate(`/movie/${filteredFavorites[focusedIndex].id}`, {
          state: filteredFavorites[focusedIndex],
        });
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        setFocusedIndex((prev) =>
          Math.min(prev + 1, filteredFavorites.length - 1)
        );
      }

      if (e.key === "ArrowUp" || e.key === "PageUp") {
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredFavorites, focusedIndex, navigate]);

  /* ================= LOAD FAVORITES ================= */
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  /* ================= REMOVE FAVORITE ================= */
  const removeFavorite = (movie: Movie) => {
    const updated = favorites.filter((m) => m.id !== movie.id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="bg-black relative h-full text-white font-[Poppins] flex flex-col">
      <HeaderFavorites
        favorites={favorites}
        query={searchQuery}
        setQuery={setSearchQuery}
        onFocusSearch={() => setShowKeyboard(true)}
        onSelect={() => {}}
      />

      {/* ================= CONTENT ================= */}
      <main className=" flex flex-col gap-8 px-4 md:px-10 lg:px-35 md:pt-38.5 pt-6 md:pb-60 pb-120 top-16 relative">
        <h1
          data-aos="fade-up"
          className="text-[24px]/[36px] md:text-3xl font-bold mb-6"
        >
          Favorites
        </h1>

        {/* ===== EMPTY FAVORITES ===== */}
        {favorites.length === 0 && (
          <div className="flex w-full justify-center">
            <div className="flex flex-col items-center gap-6 justify-center text-center w-75 h-86.5 ">
              <div className="flex flex-col w-61.5 items-center gap-3 ">
                <img src={Empety} alt="Empty" className="h-42.5" />
                <p className="text-[16px]/[30px] font-semibold ">Data Empty</p>
                <p className="text-neutral-400 text-[14px]/[28px] ">
                  You don't have a favorite movie yet
                </p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="bg-red-800 hover:bg-red-900 transition w-50  h-11 rounded-full font-semibold"
              >
                Explore Movie
              </button>
            </div>
          </div>
        )}

        {/* ===== DATA NOT FOUND ===== */}
        {filteredFavorites.length === 0 && favorites.length > 0 && (
          <div className="w-full flex justify-center">
            <div className="flex flex-col w-61.5 items-center gap-4">
              <img src={Notfound} alt="Not Found" className="h-42.5" />
              <p className="text-[16px]/[30px]font-semibold">Data Not Found</p>
              <p className="text-neutral-400 text-[14px]/[28px]">
                Try other keywords
              </p>
            </div>
          </div>
        )}

        {/* ===== FAVORITES LIST ===== */}
        {filteredFavorites.length > 0 && (
          <div className="flex flex-col gap-8">
            {filteredFavorites.map((movie, index) => (
              <div
                key={movie.id}
                data-aos="fade-up"
                className={`flex flex-col md:flex-row md:gap-12 gap-6 border-b transition-all ease-in-out duration-700 border-neutral-800 pb-8 cursor-pointer md:justify-between
                  ${index === focusedIndex ? "scale-102" : ""}
                `}
                onClick={() => navigate(`/movie/${movie.id}`, { state: movie })}
              >
                <div className="flex gap-4 md:gap-6">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-26 md:w-45.5 rounded-xl"
                  />
                  {/* INFO */}
                  <div className="flex flex-col gap-1 md:gap-6 md:w-full">
                    <h2 className="text-[16px]/[30px] md:text-[24px]/[36px] font-bold">
                      {movie.title}
                    </h2>
                    <p className="text-[14px]/[28px] md:text-[18px]/[32px]  font-medium">
                      ⭐ {movie.vote_average?.toFixed(1)}/10
                    </p>
                    <p className="text-neutral-400 md:text-[16px]/[30px] text-[14px]/[28px] line-clamp-2">
                      {movie.overview}
                    </p>
                    <div className="w-75.25 h-11 hidden md:block">
                      <WatchTrailer />
                    </div>
                  </div>{" "}
                </div>
                <div className="flex gap-4 w-full md:w-100 md:justify-end items-start">
                  <div className="w-75.25 h-11 md:hidden">
                    <WatchTrailer />
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Hentikan klik masuk ke parent
                      removeFavorite(movie);
                    }}
                  >
                    <div className="w-11 h-11 rounded-full bg-[#0A0D12]/70 border border-neutral-800 flex items-center justify-center">
                      <GoHeartFill className="text-red-500 w-6 h-6" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <div>
        <Footer />
      </div>

      {/* ================= VIRTUAL KEYBOARD (MOBILE) ================= */}
      <div className="md:hidden">
        {showKeyboard && (
          <VirtualKeyboard
            onKey={(key) => setSearchQuery((q) => q + key)}
            onBackspace={() => setSearchQuery((q) => q.slice(0, -1))}
            onReturn={() => setShowKeyboard(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;
