import { Component, inject, Input } from '@angular/core';
import { Game } from '../../../data/game.data';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'kickathon-fixture',
  standalone: true,
  imports: [],
  templateUrl: './fixture.component.html',
  styleUrl: './fixture.component.scss',
})
export class FixtureComponent {
  dataService = inject(DataService);

  @Input({ required: true })
  game!: Game;

  get player1(): string {
    if (this.is1v1A) {
      return (
        this.dataService.getPlayerById(this.game.team1Players?.[0])?.name ??
        '[Deaktivierter Nutzer]'
      );
    }
    if(!this.dataService.getPlayerById(this.game.team1Players?.[0])?.name) {
      return '[Deaktivierter Nutzer]';
    }
    return `${this.dataService.getPlayerById(this.game.team1Players?.[0])?.name ?? '[Deaktivierter Nutzer]'} & ${this.dataService.getPlayerById(this.game.team1Players?.[1])?.name ?? '[Deaktivierter Nutzer]'}`;
  }

  get player2(): string {
    if (this.is1v1B) {
      return (
        this.dataService.getPlayerById(this.game.team2Players?.[0])?.name ??
        '[Deaktivierter Nutzer]'
      );
    }
    if(!this.dataService.getPlayerById(this.game.team2Players?.[0])?.name) {
      return '[Deaktivierter Nutzer]';
    }
    return `${this.dataService.getPlayerById(this.game.team2Players?.[0])?.name ?? '[Deaktivierter Nutzer]'} & ${this.dataService.getPlayerById(this.game.team2Players?.[1])?.name ?? '[Deaktivierter Nutzer]'}`;
  }

  get is1v1A(): boolean {
    return (this.game.team1Players.length ?? 1) === 1;
  }

  get is1v1B(): boolean {
    return (this.game.team2Players.length ?? 1) === 1;
  }

  get pictureByIdA(): string | null {
    if (this.is1v1A) {
      return this.dataService.getPlayerById(this.game.team1Players?.[0])?.imageUrl ?? null;
    }
    return null;
  }

  get pictureByIdB(): string | null {
    if (this.is1v1B) {
      return this.dataService.getPlayerById(this.game.team2Players?.[0])?.imageUrl ?? null;
    }
    return null;
  }
}
