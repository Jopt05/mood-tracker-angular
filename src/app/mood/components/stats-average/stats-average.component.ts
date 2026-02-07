import { Component, OnInit } from '@angular/core';
import { MoodService, StatsAveragePayload } from '../../services/mood.service';

@Component({
  selector: 'app-stats-average',
  standalone: false,
  templateUrl: './stats-average.component.html',
  styleUrl: './stats-average.component.css'
})
export class StatsAverageComponent implements OnInit {

  constructor(private moodService: MoodService) {}

  days: number = 7;
  isLoading: boolean = true;
  hasError: boolean = false;
  statsData?: StatsAveragePayload;

  ngOnInit(): void {
    this.getStatsAverage();
  }

  getStatsAverage() {
    this.isLoading = true;
    this.hasError = false;
    this.moodService.getStatsAverage(this.days).subscribe({
      next: (response) => {
        this.statsData = response.payload;
        this.isLoading = false;
      },
      error: (err) => {
        console.log({err});
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  onDaysChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.days = parseInt(select.value);
    this.getStatsAverage();
  }

  // Convierte el promedio numérico a categoría de mood
  getMoodCategory(avgMood: number): string {
    if (avgMood <= 1.5) return 'VERY_SAD';
    if (avgMood <= 2.5) return 'SAD';
    if (avgMood <= 3.5) return 'NEUTRAL';
    if (avgMood <= 4.5) return 'HAPPY';
    return 'VERY_HAPPY';
  }

  // Convierte el promedio numérico a categoría de sleep
  getSleepCategory(avgSleep: number): string {
    if (avgSleep <= 1.5) return 'ZERO_TWO';
    if (avgSleep <= 2.5) return 'THREE_FOUR';
    if (avgSleep <= 3.5) return 'FIVE_SIX';
    if (avgSleep <= 4.5) return 'SEVEN_EIGHT';
    return 'NINE';
  }

  // Obtiene el color del indicador basado en el promedio de mood
  getMoodColor(avgMood: number): string {
    if (avgMood <= 1.5) return '#f87171'; // Very Sad - red
    if (avgMood <= 2.5) return '#fb923c'; // Sad - orange
    if (avgMood <= 3.5) return '#fbbf24'; // Neutral - yellow
    if (avgMood <= 4.5) return '#86efac'; // Happy - light green
    return '#4ade80'; // Very Happy - green
  }

  // Obtiene el color del indicador basado en el promedio de sleep
  getSleepColor(avgSleep: number): string {
    if (avgSleep <= 1.5) return '#f87171'; // 0-2 hours - red
    if (avgSleep <= 2.5) return '#fb923c'; // 3-4 hours - orange
    if (avgSleep <= 3.5) return '#fbbf24'; // 5-6 hours - yellow
    if (avgSleep <= 4.5) return '#4ade80'; // 7-8 hours - green
    return '#60a5fa'; // 9+ hours - blue
  }

}
