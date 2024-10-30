import { Component, effect, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../../../services/data.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'kickathon-curve',
  standalone: true,
  imports: [NgClass],
  templateUrl: './curve.component.html',
  styleUrl: './curve.component.scss',
})
export class CurveComponent {
  protected dataService: DataService = inject(DataService);

  chartColors: string[] | null = null;
  formCurveChart!: Chart;

  lightModeColors = {
    text: '#374151',
    grid: '#E5E7EB',
    ticks: '#6B7280',
    background: 'rgba(75, 192, 192, 0.2)',
    border: 'rgba(75, 192, 192, 1)',
    legendText: '#374151',
  };

  darkModeColors = {
    text: '#D1D5DB',
    grid: '#4B5563',
    ticks: '#9CA3AF',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'rgba(255, 255, 255, 1)',
    legendText: '#D1D5DB',
  };

  currentColors = this.lightModeColors;

  constructor() {
    this.detectColorScheme();
    effect(() => {
      const existing_chart = Chart.getChart('curve');
      existing_chart?.destroy();
      this.createChart();
    });
  }

  detectColorScheme() {
    const darkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentColors = darkModeOn ? this.darkModeColors : this.lightModeColors;
  }

  createChart(): void {
    this.generateChartColors();
    const datasets = this.dataService.history$().map((result, i) => ({
      label: result.name ?? '',
      data: result.history.map((r) => (this.dataService.sortType$() === 'elo' ? r.elo : r.billo)),
      borderColor: this.chartColors![i],
      fill: false,
      tension: 0,
    }));

    this.formCurveChart = new Chart('curve', {
      type: 'line',
      data: {
        labels: this.dataService
          .history$()?.[0]
          ?.history.map((result) => `${result.year}/${result.week}`), // todo: longest history
        datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Spieltag',
              padding: 16,
              color: this.currentColors.text,
              font: {
                size: 14,
              },
            },
            ticks: {
              color: this.currentColors.ticks,
              font: {
                size: 12,
              },
            },
            grid: {
              color: this.currentColors.grid,
            },
          },
          y: {
            min: this.getSmallestCount(this.dataService.sortType$() === 'elo'),
            max: this.getHighestCount(this.dataService.sortType$() === 'elo'),
            title: {
              display: true,
              text: 'Punkte',
              padding: 16,
              color: this.currentColors.text,
              font: {
                size: 14,
              },
            },
            ticks: {
              color: this.currentColors.ticks,
              font: {
                size: 12,
              },
            },
            grid: {
              color: this.currentColors.grid,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: this.currentColors.legendText,
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  }

  getSmallestCount(isElo: boolean) {
    const lowest = Math.min(
      ...this.dataService
        .history$()
        .map((result) =>
          isElo
            ? Math.min(...result.history.map((r) => r.elo))
            : Math.min(...result.history.map((r) => r.billo)),
        ),
    );
    return lowest > 0 ? Math.floor(lowest * 0.95) : Math.floor(lowest * 1.05);
  }

  getHighestCount(isElo: boolean) {
    const highest = Math.max(
      ...this.dataService
        .history$()
        .map((result) =>
          isElo
            ? Math.max(...result.history.map((r) => r.elo))
            : Math.max(...result.history.map((r) => r.billo)),
        ),
    );
    return Math.ceil(highest * 1.05);
  }

  generateChartColors(): void {
    if (!this.chartColors) {
      this.chartColors = this.dataService
        .history$()
        .map(
          (_, i) =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        );
    }
  }
}
