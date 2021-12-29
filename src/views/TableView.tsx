import React from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../elements/Button";
import { OtherPlayerTablo } from "../elements/OtherPlayerTablo";
import { EmptyPlayersTablo } from "../elements/EmptyPlayersTablo";
import { getNextPlayer, getPrevPlayer } from "../utils";
import { Board } from "../elements/Board";
import { MyPlayerTablo } from "../elements/MyPlayerTablo";

export const TableView = () => {
  const { tableInfo, me } = useGlobalState();
  const navigate = useNavigate();

  const nextPlayer = getNextPlayer(me.playerIndex, tableInfo?.players);
  const prevPlayer = getPrevPlayer(me.playerIndex, tableInfo?.players);
  const mePlayer = tableInfo?.players.find(
    (p) => p.playerIndex === me.playerIndex
  ) || null;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button onClick={() => navigate("/")}>Back To Lobby</Button>
        <Button
          onClick={() => console.log(`Results for table ${tableInfo?.tableId}`)}
        >
          See Results
        </Button>
      </div>
      <div className="flex justify-around mb-4">
        {nextPlayer && (
          <OtherPlayerTablo
            player={nextPlayer}
            gameInfo={tableInfo?.gameInfo || null}
          />
        )}
        {!nextPlayer && <EmptyPlayersTablo />}
        {prevPlayer && (
          <OtherPlayerTablo
            player={prevPlayer}
            gameInfo={tableInfo?.gameInfo || null}
          />
        )}
        {!prevPlayer && <EmptyPlayersTablo />}
      </div>
      <div className="mb-4 mx-2">
        <Board gameInfo={tableInfo?.gameInfo || null} mePlayer={mePlayer} nextPlayer={nextPlayer} prevPlayer={prevPlayer}/>
      </div>
      <div className="mx-2 sm:mx-8">
        {mePlayer && (
          <MyPlayerTablo
            player={mePlayer}
            gameInfo={tableInfo?.gameInfo || null}
          />
        )}
        {!mePlayer && "This Should Not Be Possible to see this"}
      </div>
    </div>
  );
};
