import { Person } from './person.data';

export type Team = {
  id: string;
  name: string;
  color: string;
  persons: Person[];
  score: number;
};
