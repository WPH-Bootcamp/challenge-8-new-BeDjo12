import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WatchTrailer from "../../ui/Button/WatchTrailer";
import Detail from "../../ui/Button/Detail";
import Trailer from "../Trailer/Trailer";
import type { Movie } from "../../../types/movie";

interface HeroProps {
  movie?: Movie | null;
}

// agar ukuran stabil saat download data
const defaultMoviePlaceholder: Movie = {
  id: 0,
  title: "Loading...",
  overview: "",
  backdrop_path: "/placeholder-backdrop.jpg",
  poster_path: null,
  release_date: "",
  vote_average: 0,
  adult: false,
};

const Hero = ({ movie }: HeroProps) => {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  const displayMovie = movie || defaultMoviePlaceholder;

  return (
    <section id="Hero" className="relative w-full md:h-184">
      <img
        data-aos="zoom-out-up"
        src={`https://image.tmdb.org/t/p/original${displayMovie.backdrop_path}`}
        className="h-98 md:h-202.5 z-0 object-cover absolute top-0 left-0 w-full"
      />
      {/* OVERLAY tetap absolute */}
      <div
        data-aos="zoom-out-up"
        className="absolute top-0 w-full h-98 md:h-202.5 z-10 bg-linear-to-t from-black via-black/85 to-black/0 "
      ></div>

      {/* CONTENT Hero */}
      <div className="pt-55.75 px-4 md:px-10 md:gap-12 lg:px-35 flex flex-col gap-6 w-full">
        <div className="flex flex-col max-w-158.75 z-30 gap-1.5 md:gap-4">
          <h1
            data-aos="fade-up"
            className="text-[24px]/[36px] w-full md:text-[48px]/[60px] font-bold"
          >
            {displayMovie.title}
          </h1>
          <p
            data-aos="fade-up"
            className="font-normal line-clamp-5 text-[14px]/[28px] md:text-[16px]/[30px] text-neutral-400 "
          >
            {displayMovie.overview}
          </p>
        </div>

        <div className="w-90.25 md:w-119 gap-4 flex flex-col md:flex-row z-30">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="w-full md:w-57.5 md:h-13 h-11"
          >
            {displayMovie.id !== 0 && (
              <WatchTrailer
                movieId={displayMovie.id}
                hasTrailer={true}
                onClick={() => setShowTrailer(true)}
              />
            )}
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="w-full md:w-57.5 md:h-13 h-11"
          >
            {displayMovie.id !== 0 && (
              <Detail
                onClick={() =>
                  navigate(`/movie/${displayMovie.id}`, { state: displayMovie })
                }
              />
            )}
          </div>
        </div>
      </div>

      {showTrailer && displayMovie.id !== 0 && (
        <Trailer
          movieId={displayMovie.id}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </section>
  );
};

export default Hero;
