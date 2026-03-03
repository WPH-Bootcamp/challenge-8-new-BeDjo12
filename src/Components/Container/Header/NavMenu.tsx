import { Link } from "react-router-dom";

interface NavMenuProps {
  className?: string; // opsional, bisa override styling dari parent
}

const NavMenu = ({ className = "" }: NavMenuProps) => {
  return (
    <nav
      className={`flex font-normal text-[16px]   gap-6 md:gap-12 ${className}`}
    >
      <div data-aos="fade-up">
        <Link
          to="/"
          className="hover:text-red-500 ease-in-out transition-all duration-700 hover:font-bold hover:text-[18px]"
        >
          Home
        </Link>
      </div>
      <div data-aos="fade-down">
        <Link
          to="/favorites"
          className="hover:text-red-500 ease-in-out transition-all duration-600 hover:font-bold hover:text-[18px]"
        >
          Favorite
        </Link>
      </div>
    </nav>
  );
};

export default NavMenu;
