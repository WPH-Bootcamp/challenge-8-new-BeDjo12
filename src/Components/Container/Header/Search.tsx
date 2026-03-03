import { useState, useEffect } from "react";
import axios from "axios";
import type { Movie } from "../../../types/movie";
import { IoSearch, IoArrowBack } from "react-icons/io5";
import VirtualKeyboard from "./VirtualKeyboard";

interface SearchProps {
  onSelect?: (movie: Movie) => void;
}

const Search = ({ onSelect }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handler = () => {
      setDesktop(media.matches);
      if (media.matches) setShowKeyboard(false);
    };
    handler();
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          { params: { api_key: apiKey, query } }
        );
        setResults(res.data.results.slice(0, 5));
        setActiveIndex(-1);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, apiKey]);

  const closeSearch = () => {
    setOpen(false);
    setShowKeyboard(false);
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
  };

  const handleEnter = () => {
    if (!results.length) return;
    const movie = results[0];
    onSelect?.(movie);
    setShowKeyboard(false);
    setOpen(false);
  };

  useEffect(() => {
    if (results.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          const movie = results[activeIndex];
          onSelect?.(movie);
          closeSearch();
        } else {
          handleEnter();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [results, activeIndex]);

  useEffect(() => {
    if (showKeyboard) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [showKeyboard]);

  return (
    <div className="relative flex items-center">
      {/* MOBILE ICON */}
      <button
        className="md:hidden w-6 h-6"
        onClick={() => {
          setOpen(true);
          setShowKeyboard(true);
        }}
      >
        <IoSearch className="w-full h-full" />
      </button>

      {/* MOBILE SEARCH */}
      {open && !desktop && (
        <div
          className={`fixed inset-0 z-40 bg-black h-screen transition-all ${
            showKeyboard ? "pb-75" : "pb-0"
          }`}
        >
          <div className="flex items-center gap-4 px-4 w-full h-16">
            <button onClick={closeSearch} className="w-6 h-6">
              <IoArrowBack className="w-full h-full" />
            </button>
            <div
              onClick={() => setShowKeyboard(true)}
              className="flex w-full bg-[#0A0D12]/60 rounded-xl border border-neutral-800 px-4 py-2"
            >
              {query ? (
                <span>{query}</span>
              ) : (
                <span className="flex items-center gap-1 text-sm text-neutral-500">
                  <IoSearch size={20} />
                  <span>Search movie</span>
                </span>
              )}
            </div>
          </div>

          {results.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => {
                onSelect?.(movie);
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

      {/* DESKTOP SEARCH */}
      <div className="hidden md:flex px-4 py-2 gap-2 justify-start max-w-60.75 w-full h-14 items-center bg-[#0A0D12]/60 text-neutral-500 backdrop-blur-2xl rounded-2xl text-[16px] relative">
        <IoSearch className="absolute w-6 h-6" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie"
          className="bg-transparent outline-none mx-9"
        />

        {results.length > 0 && (
          <div className="absolute top-10 left-0 w-full bg-[#0A0D12]/60  backdrop-blur-2xl rounded-md">
            {results.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => {
                  onSelect?.(movie);
                  setQuery("");
                  setResults([]);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-neutral-800 text-sm ${
                  index === activeIndex ? "bg-neutral-800" : ""
                }`}
              >
                {movie.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIRTUAL KEYBOARD */}
      {showKeyboard && !desktop && (
        <VirtualKeyboard
          onKey={(key) => setQuery((q) => q + key)}
          onBackspace={() => setQuery((q) => q.slice(0, -1))}
          onReturn={handleEnter}
        />
      )}
    </div>
  );
};

export default Search;
