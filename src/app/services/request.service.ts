import { Injectable, isDevMode } from '@angular/core';
import { Player } from '../data/player.data';
import axios from 'axios';
import { Game } from '../data/game.data';
import { PlayerHistoryEntry } from '../data/history.data';
import { RegisterData } from '../data/register.data';
import { UpdateProfileData } from '../data/updateprofile.data';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private host = isDevMode() ? '/api' : 'https://handsome-petra-kickathon-de3bbbf4.koyeb.app';

  async getPlayers(type?: string): Promise<Player[]> {
    if (type) {
      return (await axios.get(`${this.host}/players?sort=${type}`)).data;
    }
    return (await axios.get(`${this.host}/players`)).data;
  }

  async getPlayer(id: string): Promise<Player> {
    return (await axios.get(`${this.host}/players/${id}`)).data;
  }

  async postPlayer(player: Player): Promise<Player> {
    return (await axios.post(`${this.host}/players`, player)).data;
  }

  async putPlayer(id: string, player: Player): Promise<Player> {
    return (await axios.put(`${this.host}/players/${id}`, player)).data;
  }

  async deletePlayer(id: string): Promise<void> {
    await axios.delete(`${this.host}/players/${id}`);
  }

  async getGames(week: number, year: number): Promise<Game[]> {
    return (await axios.get(`${this.host}/games?week=${week}&year=${year}`)).data;
  }

  async getGame(id: string): Promise<Game> {
    return (await axios.get(`${this.host}/games/${id}`)).data;
  }

  async postGame(game: Game): Promise<Game> {
    return (await axios.post(`${this.host}/games`, game)).data;
  }

  async putGame(id: string, game: Game): Promise<Game> {
    return (await axios.put(`${this.host}/games/${id}`, game)).data;
  }

  async deleteGame(id: string): Promise<void> {
    await axios.delete(`${this.host}/games/${id}`);
  }

  async getHistory(id: number): Promise<PlayerHistoryEntry[]> {
    return (await axios.get(`${this.host}/players/${id}/history`)).data;
  }

  async login(data: any): Promise<{ jwt: string, id: number}> {
    return (await axios.post(`${this.host}/auth/login`, data)).data;
  }

  async register(data: RegisterData): Promise<{ jwt: string, id: number}> {
    return (await axios.post(`${this.host}/auth/register`, data)).data;
  }

  async uploadPicture(formData: FormData, playerId: number): Promise<string> {
    return (await axios.patch(`${this.host}/players/${playerId}/image`, formData)).data
  }

  async patchName(data: UpdateProfileData, playerId: number): Promise<string> {
    return (await axios.patch(`${this.host}/players/${playerId}/name`, data)).data
  }
}
