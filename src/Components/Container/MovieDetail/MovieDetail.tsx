import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import MovieDisk from "./MovieDisk";
import type { Movie } from "../../../types/movie";
import Footer from "../Footer/Footer";

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const movieFromState = location.state as Movie | null;
  const [movie, setMovie] = useState<Movie | null>(movieFromState);

  const apiKey = import.meta.env.VITE_API_KEY;

  /* ================= FETCH MOVIE ================= */
  useEffect(() => {
    if (!id) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`
    )
      .then((res) => res.json())
      .then(setMovie)
      .catch(console.error);
  }, [id, apiKey]);

  if (!movie) return null;

  const imagePath = movie.backdrop_path || movie.poster_path;

  /* ================= TOGGLE FAVORITE ================= */
  const toggleFavorite = (favMovie: Movie) => {
    const stored = localStorage.getItem("favorites");
    let favorites: Movie[] = stored ? JSON.parse(stored) : [];

    const exists = favorites.some((m) => m.id === favMovie.id);

    const updated = exists
      ? favorites.filter((m) => m.id !== favMovie.id)
      : [...favorites, favMovie];

    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  return (
    <section className="w-full bg-black flex justify-center cursor-default text-white font-[Poppins]">
      <div className="w-full max-w-360 relative">
        <Header
          onSelect={(movie) => navigate(`/movie/${movie.id}`, { state: movie })}
        />
        <div className="absolute top-0 h-86.25 md:h-202.5 w-full  z-0">
          <img
            data-aos="zoom-in"
            src={`https://image.tmdb.org/t/p/original${imagePath}`}
            alt={movie.title}
            className="h-full object-cover"
          />
          <div className="absolute bottom-0 h-50 md:h-130 w-full bg-linear-to-t from-black via-black/80 to-transparent z-10" />
        </div>

        <div className="relative pt-55.5 md:pt-103 z-20">
          <MovieDisk movie={movie} onToggleFavorite={toggleFavorite} />
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;
