import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';

@Component({
  selector: 'stepchallenge-detail',
  standalone: true,
  imports: [DatePipe, DecimalPipe, NgClass],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  protected dataService: DataService = inject(DataService);

  getStepsByPerson(day: string, id?: number): number | null {
    if (!id) {
      return null;
    }
    const person = this.dataService.getPersonById(id)!;
    const step = person.steps.find((step) => {
      return step.Day.toString().includes(day);
    });
    return step?.count ?? null;
  }

  getSportByPerson(day: string, id?: number): number | null {
    if (!id) {
      return null;
    }
    const person = this.dataService.getPersonById(id)!;
    const step = person.steps.find((step) => {
      return step.Day.toString().includes(day);
    });
    return step?.sport ?? null;
  }

  dates = [
    '2025-01-01',
    '2025-01-02',
    '2025-01-03',
    '2025-01-04',
    '2025-01-05',
    '2025-01-06',
    '2025-01-07',
    '2025-01-08',
    '2025-01-09',
    '2025-01-10',
    '2025-01-11',
    '2025-01-12',
    '2025-01-13',
    '2025-01-14',
    '2025-01-15',
    '2025-01-16',
    '2025-01-17',
    '2025-01-18',
    '2025-01-19',
    '2025-01-20',
    '2025-01-21',
    '2025-01-22',
    '2025-01-23',
    '2025-01-24',
    '2025-01-25',
    '2025-01-26',
    '2025-01-27',
    '2025-01-28',
    '2025-01-29',
    '2025-01-30',
    '2025-01-31',
  ];
}
