import { GameInfo, PlayerFull } from "../types";
import { CardSmall } from "./CardSmall";
import {getBid} from "../utils";

interface Props {
  player: PlayerFull;
  gameInfo: GameInfo | null;
}

export const OtherPlayerTablo = ({ player, gameInfo }: Props): JSX.Element => {
  const active: boolean =
    !!gameInfo?.activePlayerIndex &&
    gameInfo.activePlayerIndex === player?.playerIndex;

  const bid = getBid(player.bid)

  return (
    <div
      className={`sm:max-w-[500px] bg-sky-100 rounded w-[45vw] sm:w-[35vw] min-h-[150px] flex flex-col justify-between p-4 ${
        active && "border-2 border-green-600"
      }`}
    >
      {player && (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="">
              <div className="text-xl font-bold">{player?.name}</div>
              <div className="">{player?.isOnline ? "ONLINE" : "OFFLINE"}</div>
            </div>
            {gameInfo?.phase === "Bidding" && (
              <div className="text-xl md:text-2xl lg:text-3xl sm:text-right font-bold text-green-600">
                {bid}
              </div>
            )}
            <div className="flex items-start">
              {gameInfo?.phase !== "Bidding" && gameInfo?.bidWinner === player.playerIndex && (
                  <div className="font-bold sm:text-xl border-2 rounded border-red-400 px-2 py-1">{gameInfo.highestBid}</div>
              )}
              {gameInfo?.phase === "Play Cards" && (
                  <div className="font-bold sm:text-xl px-2 py-1">{player.trickCount}</div>
              )}
            </div>
          </div>
          <div className="flex sm:flex-col">
            <div className="hidden md:flex">
              {player?.cards &&
                player.cards
                  .split(" ")
                  .map((_, index) => <CardSmall key={index} />)}
            </div>
            <div className="md:hidden">
              {player?.cards && (
                <CardSmall value={player.cards.split(" ").length} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
