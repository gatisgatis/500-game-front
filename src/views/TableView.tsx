import React, { useState } from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../elements/Button";
import { OtherPlayerTablo } from "../elements/OtherPlayerTablo";
import { EmptyPlayersTablo } from "../elements/EmptyPlayersTablo";
import { getNextPlayer, getPrevPlayer } from "../utils";
import { Board } from "../elements/Board";
import { MyPlayerTablo } from "../elements/MyPlayerTablo";
import { ENDPOINT } from "../constants";
import { PlayerIndex } from "../types";

export interface Result {
  Player_1: number;
  Player_2: number;
  Player_3: number;
  winnerIndex: PlayerIndex;
  winningBid: number;
}

interface ReshapedResult {
  Player_1: string[];
  Player_2: string[];
  Player_3: string[];
}

export const TableView = () => {
  const { tableInfo, me } = useGlobalState();
  const navigate = useNavigate();
  const { tableId } = useParams();
  const [results, setResults] = useState<ReshapedResult>({
    Player_1: [],
    Player_2: [],
    Player_3: [],
  });
  const [showResults, setShowResults] = useState(false);

  const nextPlayer = getNextPlayer(me.playerIndex, tableInfo?.players);
  const prevPlayer = getPrevPlayer(me.playerIndex, tableInfo?.players);
  const mePlayer =
    tableInfo?.players.find((p) => p.playerIndex === me.playerIndex) || null;

  const onSeeResults = async () => {
    const response = await fetch(`${ENDPOINT}/results/${tableId}`);
    const dataString = await response.json();
    const data = JSON.parse(dataString);
    if (data) {
      if (data.isStarted) {
        console.log(data.list);
        const results = resultsConverter(data.list);
        setResults(results);
        setShowResults(true);
      }
    }
  };

  const resultsConverter = (results: Result[]) => {
    const first =
      tableInfo?.players.find((p) => p.playerIndex === "Player_1")?.name ||
      "Player_1";
    const second =
      tableInfo?.players.find((p) => p.playerIndex === "Player_2")?.name ||
      "Player_2";
    const third =
      tableInfo?.players.find((p) => p.playerIndex === "Player_3")?.name ||
      "Player_3";
    return results.reduce(
      (acc, cur) => {
        acc[cur.winnerIndex].push(`(${cur.winningBid})`);
        acc.Player_1.push(String(cur.Player_1));
        acc.Player_2.push(String(cur.Player_2));
        acc.Player_3.push(String(cur.Player_3));
        return acc;
      },
      { Player_1: [first, "500"], Player_2: [second, "500"], Player_3: [third, "500"] }
    );
  };

  return (
    <div>
      {showResults && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-20 p-4">
          <div className="relative rounded p-4 pt-8 w-full max-w-[400px] max-h-[70vh] mb-[20vh] bg-sky-100">
            <button
              onClick={() => setShowResults(false)}
              className="absolute top-0 right-0 m-1 p-1 hover:bg-sky-200"
            >
              X
            </button>
            <div className="flex justify-between">
              <div>
                {results.Player_1.map((r, i) => (
                  <div key={i} className={`${i === 0 && "font-bold"}`}>
                    {r}
                  </div>
                ))}
              </div>
              <div>
                {" "}
                {results.Player_2.map((r, i) => (
                  <div key={i} className={`${i === 0 && "font-bold"}`}>
                    {r}
                  </div>
                ))}
              </div>
              <div>
                {results.Player_3.map((r, i) => (
                  <div key={i} className={`${i === 0 && "font-bold"}`}>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between mb-4">
        <Button onClick={() => navigate("/")}>Back To Lobby</Button>
        <Button disabled={!tableInfo?.gameInfo} onClick={() => onSeeResults()}>See Results</Button>
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
        <Board
          gameInfo={tableInfo?.gameInfo || null}
          mePlayer={mePlayer}
          nextPlayer={nextPlayer}
          prevPlayer={prevPlayer}
        />
      </div>
      <div className="mx-2 sm:mx-8">
        {mePlayer && (
          <MyPlayerTablo
            player={mePlayer}
            gameInfo={tableInfo?.gameInfo || null}
          />
        )}
        {!mePlayer && "It Should Not Be Possible to see this"}
      </div>
    </div>
  );
};
