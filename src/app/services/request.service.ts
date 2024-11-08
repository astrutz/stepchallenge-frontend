import { Injectable, isDevMode } from '@angular/core';
import axios from 'axios';
import { Person } from '../data/person.data';
import {Team} from "../data/team.data";

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private host = isDevMode() ? '/api' : 'prod url incoming';

  async getPersons(type?: string): Promise<Person[]> {
    if (type) {
      return (await axios.get(`${this.host}/persons?sort=${type}`)).data;
    }
    return (await axios.get(`${this.host}/persons`)).data;
  }

  async getPerson(id: string): Promise<Person> {
    return (await axios.get(`${this.host}/persons/${id}`)).data;
  }

  async postPerson(person: Person): Promise<Person> {
    return (await axios.post(`${this.host}/persons`, person)).data;
  }

  async putPerson(id: string, person: Person): Promise<Person> {
    return (await axios.put(`${this.host}/persons/${id}`, person)).data;
  }

  async deletePerson(id: string): Promise<void> {
    await axios.delete(`${this.host}/persons/${id}`);
  }

  async getTeams(): Promise<Team[]> {
    return (await axios.get(`${this.host}/teams`)).data;
  }

  async getTeam(id: string): Promise<Team> {
    return (await axios.get(`${this.host}/teams/${id}`)).data;
  }

  async postTeam(game: Team): Promise<Team> {
    return (await axios.post(`${this.host}/teams`, game)).data;
  }

  async putTeam(id: string, game: Team): Promise<Team> {
    return (await axios.put(`${this.host}/teams/${id}`, game)).data;
  }

  async deleteTeam(id: string): Promise<void> {
    await axios.delete(`${this.host}/teams/${id}`);
  }
}
