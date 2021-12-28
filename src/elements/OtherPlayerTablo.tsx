import {GameInfo, PlayerFull} from "../types";
import { CardSmall } from "./CardSmall";

interface Props {
  player: PlayerFull;
  gameInfo: GameInfo | null;
}

export const OtherPlayerTablo = ({
  player,
  gameInfo
}: Props): JSX.Element => {
  console.log(player);

  const active: boolean =
    !!gameInfo?.activePlayerIndex && gameInfo.activePlayerIndex === player?.playerIndex;

  return (
    <div
      className={`sm:max-w-[500px] bg-slate-200 w-[45vw] sm:w-[35vw] h-[150px] flex flex-col justify-between p-4 ${
        active && "border-3 border-green-600"
      }`}
    >
      {player && (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="">
              <div className="bg-red-100">{player?.name}</div>
              <div className="bg-red-200">
                {player?.isOnline ? "ONLINE" : "OFFLINE"}
              </div>
            </div>
            {gameInfo?.phase === "Bidding" && <div>{player?.bid}</div>}
          </div>
          <div className="flex sm:flex-col">
            <div className="hidden sm:flex">
              {player?.cards &&
                player.cards
                  .split(" ")
                  .map((_, index) => <CardSmall key={index} />)}
            </div>
            <div className="sm:hidden">
              <div className="bg-green-300">
                {player?.cards && player.cards.split(" ").length}
              </div>
            </div>
            {gameInfo?.phase === "Play Cards" && (
              <div>Tricks: {player?.trickCount || 0}</div>
            )}
          </div>
        </>
      )}
      {!player && "Waiting for player to join"}
    </div>
  );
};
