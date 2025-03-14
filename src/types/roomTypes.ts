export interface Player {
    uid: string;
    displayName?: string;
    symbol: string;
  }
  
  export interface CurrentRound {
    board: string[];
    turn: string;
    status: string;
    winner: string | null;
    roundNumber: number;
    startedAt: any;
  }
  
  export interface OverallStats {
    hostWins: number;
    opponentWins: number;
    draws: number;
  }
  
  export interface RoomData {
    host: Player;
    opponent: Player | null;
    currentRound: CurrentRound;
    overall: OverallStats;
    createdAt: any;
    updatedAt: any;
  }
  