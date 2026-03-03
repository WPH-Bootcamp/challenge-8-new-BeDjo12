import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import type { Movie } from "../../../types/movie";

interface NewReleaseProps {
  onSelect: (movie: Movie) => void;
}

const NewRelease = ({ onSelect }: NewReleaseProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rows, setRows] = useState(4);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cardHeight, setCardHeight] = useState(342);

  const apiKey = import.meta.env.VITE_API_KEY;
  const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US";

  useEffect(() => {
    fetchData(1);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setRows(3);
      setCardHeight(415);
    } else {
      setRows(4);
      setCardHeight(342);
    }
  };

  const fetchData = async (pageNumber: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.get(url, {
        params: {
          api_key: apiKey,
          page: pageNumber,
        },
      });

      setMovies((prev) => [...prev, ...res.data.results]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const visibleHeight = rows * cardHeight + (rows - 1) * 16;

  return (
    <section className="w-full flex flex-col px-4 items-center gap-6 md:gap-10 md:px-10 lg:px-35">
      <p
        data-aos="fade-up"
        className="mb-6 text-left w-90.25 md:w-full font-bold text-[24px]/[36px] md:text-[36px]/[48px] "
      >
        New Release
      </p>

      {/* WRAPPER */}
      <div
        className="relative w-90.25 md:w-full  z-40 overflow-hidden transition-all duration-300"
        style={{ maxHeight: visibleHeight }}
      >
        <div className="flex flex-wrap gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 ">
          {movies.map((movie) => (
            <div
              data-aos="fade-up"
              key={movie.id}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onSelect(movie);
              }}
              className="w-[172.5px]  md:w-54 md:h-99.25 flex flex-col gap-2 md:gap-3 cursor-pointer"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="
                    w-[172.5px]
                    h-66.5
                    md:w-54 md:h-80.25
                    rounded-xl
                    object-cover
                    pointer-events-none
                  "
                />
              )}

              <p className="font-semibold text-[16px] md:text-[18px] line-clamp-1">
                {movie.title}
              </p>

              <div className="flex items-center gap-1">
                <FaStar className="text-[#E4A802]" />
                <p className="text-[14px] md:text-[16px] text-neutral-400">
                  {movie.vote_average.toFixed(1)}/10
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-82 bg-linear-to-t from-black via-black/85 to-transparent" />
      </div>

      <div className="-mt-34 w-90.25 flex h-40 md:-mt-60 md:h-80 justify-center">
        <button
          onClick={() => {
            setRows((r) => r + 1);
            if (movies.length < (rows + 1) * 6) {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchData(nextPage);
            }
          }}
          className="
           w-50 h-11 md:w-57.5 md:h-13 border-neutral-900 bg-[#0A0D12]/60
            rounded-full backdrop-blur-2xl
            hover:bg-neutral-700
            transition
            text-sm z-50
          "
        >
          Load More
        </button>
      </div>
    </section>
  );
};

export default NewRelease;
