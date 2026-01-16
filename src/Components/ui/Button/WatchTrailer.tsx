import type { FC } from "react";
import { FaPlayCircle } from "react-icons/fa";

interface WatchTrailerProps {
  movieId?: number;
  hasTrailer?: boolean;
  onClick?: () => void;
}

const WatchTrailer: FC<WatchTrailerProps> = ({
  hasTrailer = true,
  onClick,
}) => {
  if (!hasTrailer) return null;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full rounded-full h-full flex items-center justify-center gap-2 font-semibold text-sm md:text-md cursor-pointer transition-all ease-in-out duration-700 hover:bg-red-800 hover:shadow-md hover:shadow-red-400 hover:scale-102
    ${hasTrailer ? "bg-[#961200]" : "hidden"}
  `}
    >
      <p>Watch Trailer</p>
      <FaPlayCircle className="w-4.5 h-4.5" />
    </button>
  );
};

export default WatchTrailer;
