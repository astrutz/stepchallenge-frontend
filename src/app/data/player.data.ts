import { Game } from './game.data';

export type Player = {
  id: number;
  name: string;
  alias: string;
  scores?: {
    elo?: number;
    glicko?: number;
    billo?: number;
  };
  won?: number;
  lost?: number;
  games?: Game[];
  imageUrl?: string;
};
