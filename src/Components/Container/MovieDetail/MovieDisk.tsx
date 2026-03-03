import type { Movie } from "../../../types/movie";
import { LuCalendarDays } from "react-icons/lu";
import WatchTrailer from "../../ui/Button/WatchTrailer";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useState, useEffect } from "react";
import star from "/Star.svg";
import happy from "/emoji-happy.svg";
import camera from "/video.svg";
import Trailer from "../Trailer/Trailer";
import { toast } from "sonner";

interface MovieDiskProps {
  movie: Movie;
  onToggleFavorite?: (movie: Movie) => void;
}

interface BoxItem {
  id: number;
  logo: string;
  name: string;
  value: (movie: Movie) => string;
}

const Box: BoxItem[] = [
  {
    id: 1,
    logo: star,
    name: "Rating",
    value: (movie) => `${movie.vote_average?.toFixed(1)}/10`,
  },
  {
    id: 2,
    logo: camera,
    name: "Genre",
    value: (movie) => movie.genres?.[0]?.name || "-",
  },
  {
    id: 3,
    logo: happy,
    name: "Age Limit",
    value: (movie) => (movie.adult ? "18" : "13"),
  },
];

const MovieDisk = ({ movie, onToggleFavorite }: MovieDiskProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const [liked, setLiked] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (!stored) {
      setLiked(false);
      return;
    }

    const favs: Movie[] = JSON.parse(stored);
    setLiked(favs.some((m) => m.id === movie.id));
  }, [movie.id]);

  const handleToggleFavorite = () => {
    setLiked((prev) => !prev);

    toast.success(
      liked ? "Removed from Favorites" : "Success Add to Favorites",
      {
        duration: 2500,
        icon: "✅",
      }
    );

    onToggleFavorite?.(movie);
  };

  return (
    <section className="flex flex-col px-4 md:px-10 lg:px-35 pb-10 w-full gap-6 md:gap-12">
      <div data-aos="fade-up" className="flex flex-row w-full gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="md:w-65 transition-all ease-in-out duration-700 hover:scale-105 hidden md:block md:h-96 w-29 h-42.75 rounded-xl"
        />
        <div className="flex flex-col pb-10 w-full gap-6">
          <div className="w-full flex gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="md:w-65 md:hidden w-29 h-42.75 rounded-xl transition-all ease-in-out duration-700 hover:scale-105 "
            />
            <div className="w-full flex flex-col gap-1 md:gap-4">
              <h1 className="text-[20px]/[34px] md:text-[40px]/[56px] font-bold">
                {movie.title}
              </h1>
              <div className="flex gap-1 items-center">
                <LuCalendarDays className="w-5 h-5 md:w-6 md:h-6" />
                <p className="text-white font-normal text-[14px]/[28px] md:text-[16px]/[30px]">
                  {formatDate(movie.release_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex w-75.25 h-11 md:w-55 md:h-13">
              <WatchTrailer
                movieId={movie.id}
                hasTrailer={true}
                onClick={() => setShowTrailer(true)}
              />
            </div>
            <div
              onClick={handleToggleFavorite}
              className="flex w-11 h-11 md:h-13 md:w-13 rounded-full items-center justify-center bg-[#0A0D12]/60 border border-neutral-900 cursor-pointer transition-all ease-in-out duration-700 hover:scale-115 "
            >
              {liked ? (
                <GoHeartFill className="text-red-500 h-6 w-6 transition-all ease-in-out duration-700 hover:scale-120" />
              ) : (
                <GoHeart className="text-neutral-400 h-6 w-6 transition-all ease-in-out duration-700 hover:scale-120" />
              )}
            </div>
          </div>

          {/* Box Info */}
          <div className="flex gap-3 md:gap-5">
            {Box.map(({ id, logo, name, value }) => (
              <div
                key={id}
                className="flex w-full flex-col p-4 gap-2 md:p-5 items-center bg-black border border-neutral-800 rounded-2xl transition-all ease-in-out duration-700 hover:scale-105 "
              >
                <img src={logo} alt="logo" className="w-6 h-6 md:w-8 md:h-8" />
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[12px]/[24px] md:text-[16px]/[30px] font-normal text-neutral-300">
                    {name}
                  </div>
                  <div className="font-semibold text-[18px]/[32px] md:text-[20px]/[34px]">
                    {value(movie)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="flex flex-col gap-2">
        <h2
          data-aos="fade-up"
          className="text-[20px]/[34px] md:text-[32px]/[46px] font-bold"
        >
          Overview
        </h2>
        <p
          data-aos="fade-up"
          className="text-neutral-400 font-normal text-[14px]/[28px] md:text-[16px]/[30px]"
        >
          {movie.overview}
        </p>
      </div>

      {/* Cast & Crew */}
      {movie.credits?.cast && (
        <div className="flex flex-col gap-4 md:gap-6">
          <h2
            data-aos="fade-up"
            className="text-[20px]/[34px] md:text-[32px]/[46px] font-bold"
          >
            Cast & Crew
          </h2>
          <div className="flex flex-col md:gap-10 md:flex-row md:flex-wrap gap-4">
            {movie.credits.cast.slice(0, 5).map((actor) => (
              <div
                key={actor.id}
                className="flex gap-3 items-center md:w-90 md:gap-4"
              >
                <img
                  data-aos="fade-up"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/placeholder.jpg"
                  }
                  alt={actor.name}
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg object-cover"
                />
                <div>
                  <p
                    data-aos="fade-up"
                    className="font-semibold text-[14px]/[28px] md:text-[16px]/[30px]"
                  >
                    {actor.name}
                  </p>
                  <p
                    data-aos="fade-up"
                    className="text-[14px]/[28px] font-normal text-neutral-400 md:text-[16px]/[30px]"
                  >
                    {actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showTrailer && (
        <Trailer movieId={movie.id} onClose={() => setShowTrailer(false)} />
      )}
    </section>
  );
};

export default MovieDisk;
