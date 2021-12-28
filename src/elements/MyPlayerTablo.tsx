import { GameInfo, PlayerFull } from "../types";
import { useGlobalState } from "../providers/GlobalStateProvider";
import React, { useEffect, useState } from "react";
import { CardLarge } from "./CardLarge";

interface Props {
  player: PlayerFull;
  gameInfo: GameInfo | null;
}

export const MyPlayerTablo = ({ player, gameInfo }: Props): JSX.Element => {
  const { sendWsMsg, me } = useGlobalState();
  const [cardToLeft, setCardToLeft] = useState<string>("");
  const [cardToRight, setCardToRight] = useState<string>("");

  useEffect(() => {
    if (cardToRight && cardToLeft) {
      sendWsMsg(`play_turn ${me.tableId} ${cardToRight} ${cardToLeft}`);
    }
  }, [cardToLeft, cardToRight]);

  const onPlayCard = (card: string) => {
    sendWsMsg(`play_turn ${me.tableId} ${card}`);
  };

  return (
    <div
      className={`bg-slate-200 w-full h-[200px] flex flex-col justify-between p-4}`}
    >
      <div>
        <div>
          <div>{player.name}</div>
          <div>{player?.isOnline ? "ONLINE" : "OFFLINE"}</div>
        </div>
        <div>
          <div>{player.bid}</div>
          <div>{player.trickCount}</div>
        </div>
      </div>
      <div>
        {gameInfo && (
          <div className="flex">
            {player.cards &&
              player.cards.split(" ").map((card) => {
                return (
                  <CardLarge
                    key={card}
                    onPlay={() => onPlayCard(card)}
                    name={card}
                    phase={gameInfo?.phase}
                    onPassLeft={() => setCardToLeft(card)}
                    onPassRight={() => setCardToRight(card)}
                    isActive={me.playerIndex === gameInfo?.activePlayerIndex}
                  />
                );
              })}
          </div>
        )}
        {!gameInfo && "waiting for game to start"}
      </div>
    </div>
  );
};
