export interface Me {
  name: string;
  tableId: string;
  playerIndex: PlayerIndex | null;
}

export interface TableSimple {
  id: string;
  players: string[];
}

export interface PlayerSimple {
  name: string;
  isOnline: boolean;
  tableId: string;
}

type PlayerIndex = "Player_1" | "Player_2" | "Player_3";
type Phase =
  | "Bidding"
  | "Take Cards"
  | "Pass Cards"
  | "Play Cards"
  | "Round Ending"
  | "Game Ending";

interface PlayerFull {
  bid: number | null;
  cardFromBidWinner: string | null;
  cards: string;
  cardsFromTable: string | null;
  isOnline: boolean;
  name: string;
  playerIndex: PlayerIndex;
  pointsCollected: number | null;
  trickCount: number | null;
}

export interface TableFull {
  gameInfo: GameInfo | null;
  tableId: string;
  type: string;
  players: PlayerFull[];
}

interface GameInfo {
  type: string;
  activePlayerIndex: PlayerIndex;
  bidWinner: PlayerIndex | null;
  cardsPlayed: string;
  highestBid: number;
  phase: Phase;
  roundNumber: number;
  trumpSuit: string | null;
}
