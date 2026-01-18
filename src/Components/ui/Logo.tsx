import ico from "/Vector.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 md:gap-2 ">
      <img
        src={ico}
        alt="Movie-ico"
        className="w-[23.33px] h-[21.82px] md:w-10"
      />
      <p className="font-bold text-[20px] md:text-[28.5px] tracking-[-0.04em] text-white">
        MOVIE
      </p>
    </div>
  );
};

export default Logo;
