import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FixtureComponent } from '../../reusable/fixture/fixture.component';
import {LoadingSpinnerComponent} from "../../reusable/loading-spinner/loading-spinner.component";

@Component({
  selector: 'kickathon-fixtures',
  standalone: true,
  imports: [FixtureComponent, LoadingSpinnerComponent],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.scss',
})
export class FixturesComponent {
  dataService = inject(DataService);

  decreaseCalendarWeek() {
    if (this.dataService.calendarWeek$() > 1) {
      this.dataService.calendarWeek$.set(this.dataService.calendarWeek$() - 1);
    } else {
      this.dataService.calendarWeek$.set(52);
      this.dataService.calendarYear$.set(this.dataService.calendarYear$() - 1);
    }
  }

  increaseCalendarWeek() {
    if (this.dataService.calendarWeek$() < 52) {
      this.dataService.calendarWeek$.set(this.dataService.calendarWeek$() + 1);
    } else {
      this.dataService.calendarWeek$.set(1);
      this.dataService.calendarYear$.set(this.dataService.calendarYear$() + 1);
    }
  }
}
