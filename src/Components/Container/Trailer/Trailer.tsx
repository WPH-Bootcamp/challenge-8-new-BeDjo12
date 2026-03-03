import { useEffect, useState } from "react";
import type { FC } from "react";
import axios from "axios";

interface TrailerProps {
  movieId: number;
  onClose: () => void;
}

const Trailer: FC<TrailerProps> = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
        );

        const trailers = res.data.results.filter(
          (v: any) =>
            (v.type === "Trailer" || v.type === "Teaser") &&
            v.site === "YouTube"
        );

        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        } else {
          setTrailerKey(null);
        }
      } catch (err) {
        console.error(err);
        setTrailerKey(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId, apiKey]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 text-white">
        Loading trailer...
      </div>
    );
  }

  if (!trailerKey) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 text-white text-center px-4">
        <p className="text-xl font-semibold mb-4">Trailer tidak tersedia</p>
        <button
          onClick={onClose}
          className="bg-red-800 hover:bg-red-900 transition px-6 py-2 rounded-full font-semibold"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full md:w-3/4 aspect-video bg-black rounded-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-700 hover:bg-red-900 text-white px-3 py-1 rounded font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Trailer;
