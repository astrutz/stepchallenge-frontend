import { Routes } from '@angular/router';
import { LeaderboardComponent } from './components/pages/leaderboard/leaderboard.component';
import { DetailComponent } from './components/pages/detail/detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'detail', component: DetailComponent },
];
