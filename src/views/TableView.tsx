import React from "react";
import { useGlobalState } from "../elements/GlobalStateProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../elements/Button";
import { Card } from "../elements/Card";
import { BiddingBox } from "../elements/BiddingBox";

export const TableView = () => {
  const { tableInfo, sendWsMsg, me } = useGlobalState();
  const navigate = useNavigate();

  const onMakeBid = (bid: string) => {
    sendWsMsg(`play_turn ${tableInfo?.tableId} ${bid}`);
  };

  return (
    <div>
      <Button onClick={() => navigate("/")}>Back Home</Button>
      {me.playerIndex == tableInfo?.gameInfo?.activePlayerIndex && (
        <BiddingBox onSubmit={onMakeBid} />
      )}
      <div>
        {tableInfo?.players.map((player) => {
          return (
            <div key={player.name}>
              <span
                className={`${
                  player.playerIndex ===
                    tableInfo?.gameInfo?.activePlayerIndex && "bg-green-300"
                }`}
              >
                {player.name} - {player.isOnline ? "online" : "offline"}
              </span>
              <div>BID: {player.bid || "-"}</div>
              <div>Trick count: {player.trickCount || "-"}</div>
              <div>
                {player.cards.split(" ").map((card, index) => {
                  return (
                    <Card
                      key={index}
                      onClickPlay={() =>
                        sendWsMsg(`play_turn ${tableInfo?.tableId} ${card}`)
                      }
                      name={card}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3">
        <div>CARDS PLAYED:</div>
        {tableInfo?.gameInfo?.cardsPlayed &&
          tableInfo?.gameInfo?.cardsPlayed.split(" ").map((card, index) => {
            return <Card key={index} name={card} />;
          })}
      </div>
    </div>
  );
};
