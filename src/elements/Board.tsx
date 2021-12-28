import { GameInfo } from "../types";
import { BiddingBox } from "./BiddingBox";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { Button } from "./Button";

interface Props {
  gameInfo: GameInfo | null;
}

export const Board = ({ gameInfo }: Props) => {
  const { sendWsMsg, me } = useGlobalState();

  const onPass = () => {
    sendWsMsg(`play_turn ${me.tableId} -5`);
  };

  const onSubmitBid = (bid: string) => {
    sendWsMsg(`play_turn ${me.tableId} ${bid}`);
  };

  const onTakeCards = () => {
    sendWsMsg(`play_turn ${me.tableId} taking-cards`);
  };

  return (
    <div className="w-full h-[300px] bg-slate-300">
      {!gameInfo && "Game Not Started Yer"}
      {gameInfo && (
        <div>
          ALL THE STUFF HERE
          {gameInfo.phase === "Bidding" &&
            gameInfo.activePlayerIndex === me.playerIndex && (
              <BiddingBox
                onSubmit={onSubmitBid}
                onPass={onPass}
                minBid={gameInfo.highestBid ? gameInfo.highestBid + 5 : 60}
              />
            )}
          {gameInfo.phase === "Take Cards" &&
            gameInfo.activePlayerIndex === me.playerIndex && (
              <Button onClick={onTakeCards}>TAKE CARDS</Button>
            )}
        </div>
      )}
    </div>
  );
};
