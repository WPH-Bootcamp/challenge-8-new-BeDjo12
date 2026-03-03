import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaStar, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import type { Movie } from "../../../types/movie";

interface PopularProps {
  onSelect: (movie: Movie) => void;
}

const Popular = ({ onSelect }: PopularProps) => {
  const [movies, setMovie] = useState<Movie[]>([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        params: { api_key: apiKey },
      });

      const results = response.data.results;
      setMovie(results);

      if (results.length > 0) {
        onSelect(results[0]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    setShowLeft(scrollRef.current.scrollLeft > 0);
  };

  const scrollBy = (value: number) => {
    scrollRef.current?.scrollBy({
      left: value,
      behavior: "smooth",
    });
  };

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="flex justify-center">
      <div className=" relative flex flex-col w-full md:h-141.25 md:w-full h-118.5 gap-6 md:gap-10 px-4 md:pb-20 md:pl-10 lg:pl-35 py-10 md:py-0">
        {showLeft && (
          <button
            onClick={() => scrollBy(-189)}
            className="absolute cursor-pointer left-0 top-52.75 md:top-70 bg-[#0A0D12]/60 z-10 flex items-center md:left-8 lg:left-20 justify-center w-11 h-11 rounded-full"
          >
            <FaChevronLeft className="w-5.5 h-5.5 md:h-7 md:w-7 " />
          </button>
        )}

        <p
          data-aos="fade-left"
          className="font-bold text-[24px]/[36px] md:text-[36px]/[48px] z-30 "
        >
          Trending Now
        </p>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          className="
          flex gap-4 md:gap-5
          overflow-hidden
          scrollbar-hide scroll-smooth no-scrollbar
          cursor-pointer active:cursor-grabbing select-none
        "
        >
          {movies.map((item, index) => (
            <div
              data-aos="fade-left"
              key={item.id}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onSelect(item);
              }}
              className="w-43.25 md:w-54 flex flex-col gap-2 shrink-0"
            >
              {item.poster_path && (
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-[#0A0D12]/60 text-[14px] md:text-[18px] font-semibold w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full">
                    {index + 1}
                  </span>

                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    className="block rounded-xl w-43.25 h-66.5 md:w-54 md:h-80.25 pointer-events-none"
                  />
                </div>
              )}

              <p className="font-semibold line-clamp-1 md:text-[18px]/[32px] text-[16px]/[30px] ">
                {item.title}
              </p>

              <div className="flex items-center gap-1">
                <FaStar className="w-4.5 text-[#E4A802]" />
                <p className="text-[14px]/[24px] md:text-[16px]/[30px] text-neutral-400">
                  {item.vote_average.toFixed(1)}/10
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block w-30.75 md:h-100 md:top-10 md:w-50 h-87.75 absolute right-0 top-24.5 bg-linear-to-l from-black via-black/80 to-black/0" />

        <button
          onClick={() => scrollBy(189)}
          className="absolute cursor-pointer right-0 md:right-10 lg:right-20 top-52.75 bg-[#0A0D12]/60 z-10 flex items-center md:top-70 justify-center w-11 h-11 rounded-full"
        >
          <FaChevronRight className="w-5.5 h-5.5 md:h-7 md:w-7 " />
        </button>
      </div>
    </div>
  );
};

export default Popular;
