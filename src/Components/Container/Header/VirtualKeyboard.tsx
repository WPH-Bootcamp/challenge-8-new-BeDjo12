import {
  IoBackspaceOutline,
  IoMicOutline,
  IoHappyOutline,
} from "react-icons/io5";
import { LuArrowBigUp } from "react-icons/lu";

interface KeyboardProps {
  onKey: (key: string) => void;
  onBackspace: () => void;
  onReturn: () => void;
}

const VirtualKeyboard = ({ onKey, onBackspace, onReturn }: KeyboardProps) => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <div className="fixed bottom-0  left-0 w-full h-72.75 flex flex-col justify-end right-0 z-50 bg-[#393939]/73 select-none">
      {/* LETTERS */}
      <div className="w-full h-51 flex  flex-wrap justify-between items-center px-1  ">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex w-full justify-center  gap-1.5 ${
              i === 1 ? "px-6" : i === 2 ? "px-8" : ""
            }`}
          >
            {i === 2 && (
              <button className="h-10.5 min-w-11 w-full -ml-8 items-center  flex justify-center rounded-md bg-[#242424] shadow-sm shadow-black ">
                <LuArrowBigUp className="h-7 w-6.25 " />
              </button>
            )}
            {i === 2 && <span className="w-14 "></span>}

            {row.map((key) => (
              <button
                key={key}
                onClick={() => onKey(key)}
                className=" h-10.5 text-[24px] flex items-center justify-center font-normal w-full min-w-[33.3px] rounded-md bg-[#434343] shadow-sm shadow-black  active:bg-[#5A5A5E]"
              >
                {key}
              </button>
            ))}
            {i === 2 && <span className="w-14 "></span>}

            {i === 2 && (
              <button
                onClick={onBackspace}
                className="h-10.5  -mr-8 min-w-11 w-full  rounded-md bg-[#242424] flex items-center justify-center shadow-sm shadow-black"
              >
                <IoBackspaceOutline className="h-7 w-6.5" />
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-between w-full gap-2">
          {/* 123 */}
          <button className="h-10.5 w-23 rounded-md bg-[#434343]  text-[16px] shadow-sm shadow-black ">
            123
          </button>

          {/* SPACE */}
          <button
            onClick={() => onKey(" ")}
            className="flex-1 h-11 rounded-md bg-[#434343] text-[16px] shadow-sm shadow-black"
          >
            space
          </button>

          {/* RETURN */}
          <button
            onClick={onReturn}
            className="h-10.5 w-23 rounded-md  bg-[#242424] shadow-sm shadow-black text-[16px]"
          >
            return
          </button>
        </div>
      </div>
      <div className="flex items-end w-full h-10.25 justify-between px-5">
        {/* EMOJI */}
        <button>
          <IoHappyOutline className="h-[26.92px] w-[26.92px]" />
        </button>

        {/* MIC */}
        <button>
          <IoMicOutline className="h-8 w-6.75" />
        </button>
      </div>
      {/* ================= ENTER (PALING BAWAH) ================= */}
      <div className="flex justify-center w-full h-8.5">
        <button
          onClick={onReturn}
          className="
            w-full h-9
            flex items-center justify-center
            active:bg-[#5A5A5E]
          "
        >
          <div className="w-34.75 rounded-full h-1.25 bg-white "></div>
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
