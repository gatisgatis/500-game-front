import { PlayerFull, PlayerIndex } from "./types";

export const getNextPlayer = (
  myIndex: PlayerIndex | null,
  players: PlayerFull[] = []
) => {
  const getPlayerIndex = () => {
    if (myIndex === "Player_1") return "Player_2";
    else if (myIndex === "Player_2") return "Player_3";
    else return "Player_1";
  };
  const index = players.findIndex((p) => p.playerIndex === getPlayerIndex());
  if (index > -1) {
    return players[index];
  } else {
    return null;
  }
};

export const getPrevPlayer = (
  myIndex: PlayerIndex | null,
  players: PlayerFull[] = []
) => {
  const getPlayerIndex = () => {
    if (myIndex === "Player_1") return "Player_3";
    else if (myIndex === "Player_2") return "Player_1";
    else return "Player_2";
  };
  const index = players.findIndex((p) => p.playerIndex === getPlayerIndex());
  if (index > -1) {
    return players[index];
  } else {
    return null;
  }
};

export const getBid = (bid: number | null) => {
  if (bid === null) return null;
  else if (bid < 0) return "PASSED";
  else if (bid > 0) return `${bid}`;
  else return "NO BID MADE";
};
