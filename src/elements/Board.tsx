import { GameInfo, PlayerFull, PlayerIndex, Suit } from "../types";
import { BiddingBox } from "./BiddingBox";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { Button } from "./Button";
import { CardLargeDumb } from "./CardLargeDumb";
import { useEffect, useState } from "react";
import { CardSmall } from "./CardSmall";

interface Props {
  gameInfo: GameInfo | null;
  mePlayer: PlayerFull | null;
  nextPlayer: PlayerFull | null;
  prevPlayer: PlayerFull | null;
}

export const Board = ({
  gameInfo,
  mePlayer,
  nextPlayer,
  prevPlayer,
}: Props) => {
  const { sendWsMsg, me } = useGlobalState();
  const [confirmTrick, setConfirmTrick] = useState(false);

  useEffect(() => {
    setConfirmTrick(false);
  }, [gameInfo?.cardsPlayed]);

  const onPass = () => {
    sendWsMsg(`play_turn ${me.tableId} -5`);
  };

  const onSubmitBid = (bid: string) => {
    sendWsMsg(`play_turn ${me.tableId} ${bid}`);
  };

  const onTakeCards = () => {
    sendWsMsg(`play_turn ${me.tableId} taking-cards`);
  };

  const onRoundEnd = () => {
    sendWsMsg(`play_turn ${me.tableId} round-end`);
  };

  const active = gameInfo?.activePlayerIndex === me.playerIndex;

  const FullTrick = () => {
    if (
      !gameInfo?.cardsPlayed &&
      gameInfo?.cardsPrevTrick &&
      confirmTrick &&
      gameInfo.phase === "Play Cards"
    ) {
      return (
        <div className="flex">
          {gameInfo.cardsPrevTrick.split(" ").map((card) => (
            <CardLargeDumb key={card} name={card} />
          ))}
        </div>
      );
    }
    return null;
  };

  const bgColorClassName = () => {
    const suit = gameInfo?.trumpSuit;
    if (suit === "c") return "bg-green-600";
    else if (suit === "d") return "bg-blue-600";
    else if (suit === "h") return "bg-red-600";
    else if (suit === "s") return "bg-gray-500";
  };

  const getRoundResultsAdditionalInfo = (player: PlayerFull | null) => {
    if (gameInfo?.activePlayerIndex === player?.playerIndex) {
      const points = player?.pointsCollected || 0;
      const bid = gameInfo?.highestBid || 0;
      if (points >= bid) {
        return (
          <span className="">
            <span className="text-green-500">WON</span>
            {` (${points} >= ${bid})`}
          </span>
        );
      } else {
        return (
          <span className="">
            <span className="text-red-500">LOST</span>
            {` (${points} < ${bid})`}
          </span>
        );
      }
    }
  };

  return (
    <div
      className="w-full relative h-[50vw] max-h-[300px] min-h-[180px] bg-sky-200 rounded flex items-center justify-center"
      onClick={() => {
        if (gameInfo?.cardsPlayed === "") setConfirmTrick(true);
      }}
    >
      {!gameInfo && (
        <div className="sm:text-2xl text-center">
          <div>GAME NOT STARTED YET!</div>
          <div>WAITING FOR OTHER PLAYERS TO JOIN...</div>
        </div>
      )}
      <div className="absolute bottom-[5%]">
        {active && <FullTrick />}
        {mePlayer?.playedCard && !confirmTrick && (
          <CardLargeDumb name={mePlayer.playedCard} />
        )}
        {gameInfo?.phase === "Round Ending" && active && (
          <Button onClick={onRoundEnd}>CONTINUE</Button>
        )}
      </div>
      <div className="absolute left-0 top-[5%]">
        {nextPlayer?.playerIndex === gameInfo?.activePlayerIndex && (
          <FullTrick />
        )}
        {nextPlayer?.playedCard && !confirmTrick && (
          <CardLargeDumb name={nextPlayer.playedCard} />
        )}
      </div>
      <div className="absolute right-0 top-[5%]">
        {prevPlayer?.playerIndex === gameInfo?.activePlayerIndex && (
          <FullTrick />
        )}
        {prevPlayer?.playedCard && !confirmTrick && (
          <CardLargeDumb name={prevPlayer.playedCard} />
        )}
      </div>
      <div className={`absolute right-[5%] bottom-1/4 text-[3vw]`}>
        {gameInfo?.phase === "Play Cards" && gameInfo.trumpSuit && (
          <div className="flex flex-col items-end">
            {gameInfo.marriagePoints > 0 && (
              <div className="text-blue-600 font-bold text-[4vw]">
                {gameInfo.marriagePoints}
              </div>
            )}
            <div
              className={`lg:text-2xl font-bold text-white p-2 sm:p-4 ${bgColorClassName()}`}
            >
              TRUMP SUIT
            </div>
          </div>
        )}
        {(gameInfo?.phase === "Bidding" ||
          gameInfo?.phase === "Take Cards") && (
          <div className="flex">
            {[1, 2, 3].map((card) => {
              return <CardSmall key={card} />;
            })}
          </div>
        )}
      </div>
      <div className={`absolute top-[5%]`}>
        {gameInfo?.phase === "Round Ending" && (
          <div className="text-lg font-bold">
            <div className="text-xl font-bold">ROUND RESULTS</div>
            <div>
              {mePlayer?.name}: {mePlayer?.pointsCollected}{" "}
              {getRoundResultsAdditionalInfo(mePlayer)}
            </div>
            <div>
              {nextPlayer?.name}: {nextPlayer?.pointsCollected}{" "}
              {getRoundResultsAdditionalInfo(nextPlayer)}
            </div>
            <div>
              {prevPlayer?.name}: {prevPlayer?.pointsCollected}{" "}
              {getRoundResultsAdditionalInfo(prevPlayer)}
            </div>
          </div>
        )}
      </div>
      {gameInfo && (
        <div>
          {gameInfo.phase === "Bidding" && active && (
            <BiddingBox
              onSubmit={onSubmitBid}
              onPass={onPass}
              minBid={gameInfo.highestBid ? gameInfo.highestBid + 5 : 60}
            />
          )}
          {gameInfo.phase === "Take Cards" && active && (
            <Button onClick={onTakeCards}>TAKE CARDS</Button>
          )}
        </div>
      )}
    </div>
  );
};
