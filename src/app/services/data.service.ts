import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Player } from '../data/player.data';
import { Game } from '../data/game.data';
import { RequestService } from './request.service';
import { PlayerHistory } from '../data/history.data';
import { sign } from 'chart.js/helpers';

export type APIData<T> = {
  data: T;
  loadingState: 'loading' | 'success';
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public playersLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public players$: WritableSignal<Player[]> = signal([]);
  public gamesLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public games$: WritableSignal<Game[]> = signal([]);
  public historyLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public history$: WritableSignal<PlayerHistory[]> = signal([]);

  public sortType$ = signal('');
  public calendarWeek$ = signal(this.weekNumber);
  public calendarYear$ = signal(this.currentYear);

  private _requestService: RequestService = inject(RequestService);
  constructor() {
    effect(() => {
      this._requestService
        .getPlayers(this.sortType$() === '' ? undefined : this.sortType$())
        .then((players) => {
          this.players$.set(players);
          this.playersLoadingState$.set('success');
          if (this.historyLoadingState$() === 'loading') {
            this.loadPlayerHistory();
          }
        });
    });
    effect(() => {
      this._requestService.getGames(this.calendarWeek$(), this.calendarYear$()).then((games) => {
        this.games$.set(games);
        this.gamesLoadingState$.set('success');
      });
    });
  }

  public getPlayerById(id?: number): Player | null {
    if(!id) {
      return null;
    }
    return this.players$().find((player) => player.id === id) ?? null;
  }

  public loadPlayerHistory() {
    this.historyLoadingState$.set('loading');
    this.history$.set([]);
    let loaded = 0;
    this.players$().forEach((player) => {
      this._requestService.getHistory(player.id).then((history) => {
        this.history$.update((oldHistory) => {
          loaded++;
          oldHistory.push({ name: player.name, history });
          if (loaded === this.players$().length) {
            this.historyLoadingState$.set('success');
            return oldHistory;
          }
          return oldHistory;
        });
      });
    });
  }

  get weekNumber(): number {
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return week - 1;
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
