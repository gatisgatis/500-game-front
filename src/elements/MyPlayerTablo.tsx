import { GameInfo, PlayerFull } from "../types";
import { useGlobalState } from "../providers/GlobalStateProvider";
import React, { useEffect, useState } from "react";
import { CardLarge } from "./CardLarge";
import { getBid } from "../utils";
import { Button } from "./Button";

interface Props {
  player: PlayerFull;
  gameInfo: GameInfo | null;
}

export const MyPlayerTablo = ({ player, gameInfo }: Props): JSX.Element => {
  const { sendWsMsg, me } = useGlobalState();
  const [cardToLeft, setCardToLeft] = useState<string>("");
  const [cardToRight, setCardToRight] = useState<string>("");
  const [confirmPassingCards, setConfirmPassingCards] = useState(false);

  useEffect(() => {
    if (cardToRight && cardToLeft && confirmPassingCards) {
      sendWsMsg(`play_turn ${me.tableId} ${cardToRight} ${cardToLeft}`);
      setCardToRight("");
      setCardToLeft("");
      setConfirmPassingCards(false);
    }
  }, [cardToLeft, cardToRight, confirmPassingCards]);

  const onPlayCard = (card: string) => {
    sendWsMsg(`play_turn ${me.tableId} ${card}`);
  };

  const bid = getBid(player.bid);

  const active: boolean =
    !!gameInfo?.activePlayerIndex &&
    gameInfo.activePlayerIndex === player?.playerIndex;

  return (
    <div
      className={`bg-sky-100 w-full flex flex-col justify-between px-8 py-8 rounded ${
        active && "border-4 border-green-400"
      }`}
    >
      <div className="mb-4 mx-8 flex justify-between ">
        <div>
          <div className="text-2xl font-bold">{player.name}</div>
          <div className="">{player?.isOnline ? "ONLINE" : "OFFLINE"}</div>
        </div>
        <div>
          <div className="text-[4vw] lg:text-4xl font-bold text-green-600">
            {bid}
          </div>
          <div className="flex items-start">
            {gameInfo?.phase === "Play Cards" &&
              gameInfo.bidWinner === player.playerIndex && (
                <div className="font-bold sm:text-xl border-2 rounded border-red-400 px-2 py-1">
                  {gameInfo.highestBid}
                </div>
              )}
            {gameInfo?.phase === "Play Cards" && (
              <div className="font-bold sm:text-xl px-2 py-1">
                {player.trickCount}
              </div>
            )}
          </div>
          {cardToLeft && cardToRight && (
            <Button onClick={() => setConfirmPassingCards(true)}>
              {`CONFIRM PASSING ${cardToLeft} ${cardToRight}`}
            </Button>
          )}
        </div>
      </div>
      <div className="min-h-[80px] flex items-center justify-center">
        {gameInfo &&
          player.cards &&
          player.cards.split(" ").map((card) => {
            return (
              <CardLarge
                key={card}
                onPlay={() => onPlayCard(card)}
                name={card}
                phase={gameInfo?.phase}
                onPassLeft={() => setCardToLeft(card)}
                onPassRight={() => setCardToRight(card)}
                onClearPass={() => {
                  if (card === cardToRight) setCardToRight("");
                  else if (card === cardToLeft) setCardToLeft("");
                }}
                isSelected={card === cardToLeft || card === cardToRight}
                active={active}
              />
            );
          })}
      </div>
    </div>
  );
};
