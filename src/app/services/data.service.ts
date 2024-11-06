import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { RequestService } from './request.service';
import { Person } from '../data/person.data';
import { Team } from '../data/team.data';

// TODO
// Heading in babiel Schrift wie Megamarsch
// Eingetragen in Prozent wieviel schon

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public personsLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public persons$: WritableSignal<Person[]> = signal([]);
  public teamsLoadingState$: WritableSignal<'loading' | 'success'> = signal('loading');
  public teams$: WritableSignal<Team[]> = signal([]);
  public leaderboard$ = computed(() => this.teams$().sort((a, b) => b.score - a.score));

  private _requestService: RequestService = inject(RequestService);
  constructor() {
    this._requestService.getPersons().then((persons) => {
      this.persons$.set(persons);
      this.personsLoadingState$.set('success');
    });

    this._requestService.getTeams().then((teams) => {
      this.teams$.set(teams);
      this.teamsLoadingState$.set('success');
    });
  }

  public getPersonById(id?: number): Person | null {
    if (!id) {
      return null;
    }
    return this.persons$().find((person) => person.id === id) ?? null;
  }
}
