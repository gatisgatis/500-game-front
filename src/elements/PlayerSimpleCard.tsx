import { PlayerSimple } from "../types";

interface Props {
  player: PlayerSimple;
  myName: string;
}

export const PlayerSimpleCard = ({ myName, player }: Props): JSX.Element => {
  return (
    <div
      className={`flex justify-between items-center p-2 w-full font-bold`}
    >
      <div className="px-2 whitespace-nowrap">
        <span className={`${player.isOnline ? "text-green-600" : "text-gray-400"} mr-2`}>♦</span>{player.name}{player.name === myName && " (me)"}
      </div>
      <div>{player.tableId || "---"}</div>
    </div>
  );
};
