export type PlayerHistoryEntry = {
  year: number;
  week: number;
  elo: number;
  billo: number;
}

export type PlayerHistory = {
  name: string;
  history: PlayerHistoryEntry[];
}
