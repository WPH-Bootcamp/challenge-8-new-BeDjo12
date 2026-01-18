interface DetailProps {
  onClick: () => void;
}

const Detail = ({ onClick }: DetailProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-full font-semibold text-sm md:text-md bg-[#0A0D12]/60 border border-neutral-900 rounded-full backdrop-blur-2xl cursor-pointer transition-all ease-in-out duration-700   hover:bg-neutral-950 hover:shadow-md hover:shadow-neutral-600 hover:scale-102"
    >
      See Detail
    </button>
  );
};

export default Detail;
