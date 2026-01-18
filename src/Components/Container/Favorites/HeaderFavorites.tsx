import { useState } from "react";
import type { Movie } from "../../../types/movie";
import Logo from "../../ui/Logo";
import NavMenu from "../Header/NavMenu";
import SearchFavorites from "./SearchFavorites";
import { IoMenu, IoClose } from "react-icons/io5";

interface HeaderFavoritesProps {
  favorites: Movie[];
  onSelect: (movie: Movie) => void;
  onFocusSearch: () => void;
  query: string;
  setQuery: (value: string) => void;
}

const HeaderFavorites = ({
  favorites,
  onSelect,
  onFocusSearch,
  query,
  setQuery,
}: HeaderFavoritesProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#0A0D12]/60 backdrop-blur-2xl">
      <div className="h-16 md:h-22.5 px-4 md:px-10 lg:px-35 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3 md:gap-20">
          <Logo />
          <NavMenu className="hidden md:flex" />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* SEARCH */}
          <SearchFavorites
            favorites={favorites}
            onSelect={onSelect}
            onFocus={onFocusSearch}
            query={query}
            setQuery={setQuery}
          />

          {/* HAMBURGER */}
          <button
            className="md:hidden w-6 h-6"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <IoClose className="w-full h-full" />
            ) : (
              <IoMenu className="w-full h-full" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full min-h-screen bg-black">
          <NavMenu className="flex flex-col gap-4 p-6" />
        </div>
      )}
    </header>
  );
};

export default HeaderFavorites;
