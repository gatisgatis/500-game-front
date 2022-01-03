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

  const cardWithHeightClassName = "w-12 h-16 sm:w-14 sm:h-20 md:w-16 md:h:24 lg:w-20 lg:h-28"

  return (
    <div
      className={`relative flex justify-center items-center rounded mx-1 ${bgColorClassName()} ${cardWithHeightClassName}`}
    >
      <div className="text-white text-[6vw] lg:text-6xl font-bold">{rank}</div>
    </div>
  );
};
