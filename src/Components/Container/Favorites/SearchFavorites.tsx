import { useEffect, useState } from "react";
import type { Movie } from "../../../types/movie";
import { IoSearch, IoArrowBack } from "react-icons/io5";

interface SearchFavoritesProps {
  favorites: Movie[];
  onSelect: (movie: Movie) => void;
  onFocus: () => void;
  query: string;
  setQuery: (value: string) => void;
}

const SearchFavorites = ({
  favorites,
  onSelect,
  onFocus,
  query,
  setQuery,
}: SearchFavoritesProps) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  /* ===============================
     BREAKPOINT CHECK
  =============================== */
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handler = () => setDesktop(media.matches);
    handler();
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  /* ===============================
     FILTER FAVORITES
  =============================== */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = favorites.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
      setActiveIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, favorites]);

  /* ===============================
     CLOSE SEARCH
  =============================== */
  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
  };

  return (
    <div className="relative flex items-center">
      {/*  MOBILE ICON  */}
      <button
        className="md:hidden w-6 h-6"
        onClick={() => {
          setOpen(true);
          onFocus(); // 🔥 buka virtual keyboard
        }}
      >
        <IoSearch className="w-full h-full" />
      </button>

      {/* MOBILE SEARCH  */}
      {open && !desktop && (
        <div className="fixed inset-0 z-40 bg-black h-screen pb-72">
          <div className="flex items-center gap-4 px-4 w-full h-16">
            <button onClick={closeSearch} className="w-6 h-6">
              <IoArrowBack className="w-full h-full" />
            </button>

            <div
              onClick={onFocus}
              className="flex w-full bg-[#0A0D12]/60 rounded-xl border border-neutral-800 px-4 py-2 text-white"
            >
              {query || "Search movie"}
            </div>
          </div>

          {results.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => {
                onSelect(movie);
                closeSearch();
              }}
              className={`block w-full text-left px-4 py-3 border-b border-neutral-800 text-sm ${
                index === activeIndex ? "bg-neutral-800" : ""
              }`}
            >
              {movie.title}
            </button>
          ))}
        </div>
      )}

      {/*  DESKTOP SEARCH  */}
      <div className="hidden md:flex px-4 py-2 gap-2 max-w-65 w-full h-14 items-center bg-[#0A0D12]/60 rounded-2xl relative">
        <IoSearch className="absolute w-6 h-6" />
        <input
          value={query}
          onFocus={onFocus}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie"
          className="bg-transparent outline-none mx-9 text-white w-full"
        />

        {/*  DESKTOP RESULTS  */}
        {results.length > 0 && (
          <div className="absolute top-10 left-10 w-55 bg-[#0A0D12]/80 backdrop-blur-2xl overflow-hidden  z-50">
            {results.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => {
                  onSelect(movie);
                  closeSearch();
                }}
                className={`
          w-full text-left px-4 py-3 text-sm
          hover:bg-neutral-800
          ${index === activeIndex ? "bg-neutral-800" : ""}
        `}
              >
                {movie.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFavorites;
