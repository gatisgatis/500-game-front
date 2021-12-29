import { Phase, Suit } from "../types";

interface Props {
  name: string;
  onPlay: () => void;
  onPassRight: () => void;
  onPassLeft: () => void;
  onClearPass: () => void;
  phase: Phase;
  isSelected: boolean;
  active: boolean;
}

export const CardLarge = ({
  name,
  isSelected,
  onPlay,
  phase,
  onPassLeft,
  onPassRight,
  onClearPass,
  active,
}: Props): JSX.Element => {
  const bgColorClassName = () => {
    const suit = name.split("")[1] as Suit;
    if (suit === "c")
      return `${
        isSelected ? "bg-green-300" : "bg-green-600 hover:bg-green-500"
      }`;
    else if (suit === "d")
      return `${isSelected ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-500"}`;
    else if (suit === "h")
      return `${isSelected ? "bg-red-300" : "bg-red-600 hover:bg-red-500"}`;
    else if (suit === "s")
      return `${isSelected ? "bg-gray-300" : "bg-gray-500 hover:bg-gray-400"}`;
  };
  const rank = name.split("")[0];

  return (
    <div
      className={`relative overflow-hidden flex justify-center items-center max-w-[80px] min-w-[32px] w-[8vw] max-h-[100px] min-h-[40px] h-[10vw] rounded mx-1 ${bgColorClassName()}`}
    >
      <div className="text-white text-[6vw] lg:text-6xl font-bold">{rank}</div>
      {phase === "Pass Cards" && active && (
        <div className="absolute top-0 flex flex-between w-full">
          {!isSelected && (
            <>
              <button
                className="text-xs text-bold text-white w-1/2 p-1 hover:bg-[rgba(0,0,0,0.2)]"
                onClick={onPassRight}
              >
                ←
              </button>
              <button
                className="text-xs text-bold text-white w-1/2 p-1 hover:bg-[rgba(0,0,0,0.2)]"
                onClick={onPassLeft}
              >
                →
              </button>
            </>
          )}
          {isSelected && (
            <button
              className="text-xs text-bold text-white w-full p-1 hover:bg-[rgba(0,0,0,0.2)]"
              onClick={onClearPass}
            >
              X
            </button>
          )}
        </div>
      )}
      {phase === "Play Cards" && active && (
        <div className="absolute top-0 flex flex-between w-full">
          <button
            className="text-xs text-bold text-white w-full p-1 hover:bg-[rgba(0,0,0,0.2)]"
            onClick={onPlay}
          >
            PLAY
          </button>
        </div>
      )}
    </div>
  );
};
