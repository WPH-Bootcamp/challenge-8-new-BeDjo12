import type { Movie } from "../../../types/movie";
import Logo from "../../ui/Logo";
import NavMenu from "./NavMenu";
import Search from "./Search";
import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

interface HeaderProps {
  onSelect?: (movie: Movie) => void;
}

const Header = ({ onSelect }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`
          fixed top-0 z-50 w-full max-w-360
          px-4 md:px-10 lg:px-35
          flex items-center justify-between
          transition-colors duration-300
          ${scrolled ? "bg-[#0A0D12]/60 backdrop-blur-2xl" : "bg-transparent"}
          h-16 md:h-22.5
        `}
      >
        {/* LEFT */}
        <div className="flex gap-3 items-center md:gap-20">
          <Logo />
          <NavMenu className="hidden  md:flex" />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 relative">
          <Search onSelect={onSelect} />

          {/* HAMBURGER */}
          <button
            className="md:hidden w-6 h-6 cursor-pointer "
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <IoClose className="w-full h-full" />
            ) : (
              <IoMenu className="w-full h-full" />
            )}
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black md:hidden">
          <div className="pt-22 px-4">
            <NavMenu className="flex flex-col gap-4" />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
