import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgClass } from '@angular/common';
import { Player } from '../../../data/player.data';
import { Game } from '../../../data/game.data';
import { LoadingSpinnerComponent } from '../../reusable/loading-spinner/loading-spinner.component';

@Component({
  selector: 'stepchallenge-leaderboard',
  standalone: true,
  imports: [NgClass, LoadingSpinnerComponent],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
  protected dataService: DataService = inject(DataService);
  currentView: string = 'default';

  getGoals(player: Player): string {
    return `${this._getScoredGoals(player)} : ${this._getConcededGoals(player)}`;
  }

  getGoalDifference(player: Player): number {
    return this._getScoredGoals(player) - this._getConcededGoals(player);
  }

  getWinRatio(player: Player): string {
    const ratio = player.games?.length ? ((player.won ?? 0) / (player.games.length ?? 1)) * 100 : 0;
    return `${Math.round(ratio)}%`;
  }

  private _getScoredGoals(player: Player): number {
    return (
      (
        player.games?.map((game: Game) => {
          if (game.team1Players[0] === player.id || game.team1Players[1] === player.id) {
            return game.scoreTeam1;
          } else if (game.team2Players[0] === player.id || game.team2Players[1] === player.id) {
            return game.scoreTeam2;
          }
          return 0;
        }) ?? []
      ).reduce((a, b) => a + b, 0) ?? 0
    );
  }

  private _getConcededGoals(player: Player): number {
    return (
      (
        player.games?.map((game: Game) => {
          if (game.team1Players[0] === player.id || game.team1Players[1] === player.id) {
            return game.scoreTeam2;
          } else if (game.team2Players[0] === player.id || game.team2Players[1] === player.id) {
            return game.scoreTeam1;
          }
          return 0;
        }) ?? []
      ).reduce((a, b) => a + b, 0) ?? 0
    );
  }

  onSortChange(event: Event, value: string): void {
    this.dataService.sortType$.set(value);
  }

  onViewChange(event: Event, value: string): void {
    this.currentView = value;
  }
}
