import { Suit } from "../types";

interface Props {
  name: string;
}

export const CardLargeDumb = ({ name }: Props): JSX.Element => {
  const bgColorClassName = () => {
    const suit = name.split("")[1] as Suit;
    if (suit === "c") return "bg-green-600";
    else if (suit === "d") return "bg-blue-600";
    else if (suit === "h") return "bg-red-600";
    else if (suit === "s") return "bg-gray-500";
  };
  const rank = name.split("")[0];

  return (
    <div
      className={`relative flex justify-center items-center max-w-[80px] min-w-[32px] w-[8vw] max-h-[100px] min-h-[40px] h-[10vw] rounded mx-1 ${bgColorClassName()}`}
    >
      <div className="text-white text-[6vw] lg:text-6xl font-bold">{rank}</div>
    </div>
  );
};
