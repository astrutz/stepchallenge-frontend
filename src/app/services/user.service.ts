import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Player } from '../data/player.data';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private router: Router = inject(Router);
  private jwtHelper: JwtHelperService = inject(JwtHelperService);
  private requestService: RequestService = inject(RequestService);

  public currentUser: Player | null = null;

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('playerId');
    this.currentUser = null;
    if (this.router.url.includes('results')) {
      this.router.navigate(['/login']);
    }
  }

  public isAuthenticated(): boolean {
    if (this.currentPlayerId && !this.currentUser) {
      this.setPlayer();
    }
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  setCurrentPlayerId(id: number) {
    localStorage.setItem('playerId', id.toString());
    this.setPlayer();
  }

  public get currentPlayerId(): number | null {
    const item = localStorage.getItem('playerId');
    return item ? +item : null;
  }

  public async setPlayer() {
    const id = this.currentPlayerId;
    if (id) {
      this.currentUser = await this.requestService.getPlayer(id.toString());
    }
  }
}
