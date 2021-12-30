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

export type PlayerIndex = "Player_1" | "Player_2" | "Player_3";

export type Phase =
  | "Bidding"
  | "Take Cards"
  | "Pass Cards"
  | "Play Cards"
  | "Round Ending"
  | "Game Ending";

export type Suit = "d" | "c" | "h" | "s";

export type Rank = "9" | "T" | "J" | "Q" | "K" | "A";

export interface PlayerFull {
  bid: number | null;
  cardFromBidWinner: string | null;
  cards: string;
  cardsFromTable: string | null;
  isOnline: boolean;
  name: string;
  playerIndex: PlayerIndex;
  pointsCollected: number | null;
  trickCount: number | null;
  playedCard: string | null;
}

export interface TableFull {
  gameInfo: GameInfo | null;
  tableId: string;
  type: string;
  players: PlayerFull[];
}

export interface GameInfo {
  type: string;
  activePlayerIndex: PlayerIndex;
  bidWinner: PlayerIndex | null;
  cardsPlayed: string;
  cardsPrevTrick: string;
  highestBid: number;
  phase: Phase;
  roundNumber: number;
  trumpSuit: string | null;
  marriagePoints: number;
}
