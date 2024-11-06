import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Player } from '../data/player.data';
import { Game } from '../data/game.data';
import { RequestService } from './request.service';
import { PlayerHistory } from '../data/history.data';
import { sign } from 'chart.js/helpers';
import { Person } from '../data/person.data';
import { Team } from '../data/team.data';

// Striche für Top 3 breiter
// Babiel Hintergrund lila mit Schleife im Header
// Über die ganze Seite sonst die Form
// Heading in babiel Schrift wie Megamarsch
// Mehr Abstand bei Legende der Formkurve, keine Kästchen sondern nur Punkte

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public personsLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public persons$: WritableSignal<Person[]> = signal([]);
  public teamsLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public teams$: WritableSignal<Team[]> = signal([]);
  public historyLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public history$: WritableSignal<PlayerHistory[]> = signal([]);

  public sortType$ = signal('');
  public calendarWeek$ = signal(this.weekNumber);
  public calendarYear$ = signal(this.currentYear);

  private _requestService: RequestService = inject(RequestService);
  constructor() {
    effect(() => {
      this._requestService
        .getPersons(this.sortType$() === '' ? undefined : this.sortType$())
        .then((persons) => {
          this.persons$.set(persons);
          this.personsLoadingState$.set('success');
        });
    });
    effect(() => {
      this._requestService.getTeams().then((teams) => {
        this.teams$.set(teams);
        this.teamsLoadingState$.set('success');
      });
    });
  }

  public getPersonById(id?: number): Person | null {
    if (!id) {
      return null;
    }
    return this.persons$().find((person) => person.id === id) ?? null;
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
