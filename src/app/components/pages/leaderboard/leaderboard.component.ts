import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgClass } from '@angular/common';
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
}
