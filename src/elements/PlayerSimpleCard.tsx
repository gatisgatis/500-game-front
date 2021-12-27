import { PlayerSimple } from "../types";

interface Props {
  player: PlayerSimple;
  myName: string;
}

export const PlayerSimpleCard = ({ myName, player }: Props): JSX.Element => {
  return (
    <div
      className={`flex justify-between items-center border-2 border-red-300 border-dashed p-2 w-full ${
        player.isOnline ? "bg-green-400" : "bg-red-200"
      }`}
    >
      <div className="px-2">
        {player.name === myName && "<>"}
        {player.name}
      </div>
      <div>{player.tableId || "---"}</div>
    </div>
  );
};
