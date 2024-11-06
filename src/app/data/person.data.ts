import { Team } from './team.data';
import { Step } from './step.data';

export type Person = {
  id: number;
  name: string;
  shortcut: string;
  team: Team;
  steps: Step[];
};
