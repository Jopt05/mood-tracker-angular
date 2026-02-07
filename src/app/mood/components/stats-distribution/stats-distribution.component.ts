import { Component, OnInit } from '@angular/core';
import { MoodService, StatsDistributionPayload } from '../../services/mood.service';

@Component({
  selector: 'app-stats-distribution',
  standalone: false,
  templateUrl: './stats-distribution.component.html',
  styleUrl: './stats-distribution.component.css'
})
export class StatsDistributionComponent implements OnInit {

  constructor(private moodService: MoodService) {}

  daysRange: number = 30;
  isLoading: boolean = true;
  hasError: boolean = false;
  statsData?: StatsDistributionPayload;
  moodEntries: { label: string; percentage: number; color: string }[] = [];
  sleepEntries: { label: string; percentage: number; color: string }[] = [];

  ngOnInit(): void {
    this.getStatsDistribution();
  }

  getStatsDistribution() {
    this.isLoading = true;
    this.hasError = false;
    this.moodService.getStatsDistribution(this.daysRange).subscribe({
      next: (response) => {
        this.statsData = response.payload;
        this.processMoodData();
        this.processSleepData();
        this.isLoading = false;
      },
      error: (err) => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  processMoodData() {
    if (!this.statsData?.moodDistribution) return;

    const moodColors: { [key: string]: string } = {
      'VERY_HAPPY': '#4ade80',
      'HAPPY': '#86efac',
      'NEUTRAL': '#fbbf24',
      'SAD': '#fb923c',
      'VERY_SAD': '#f87171'
    };

    const moodLabels: { [key: string]: string } = {
      'VERY_HAPPY': 'Very Happy',
      'HAPPY': 'Happy',
      'NEUTRAL': 'Neutral',
      'SAD': 'Sad',
      'VERY_SAD': 'Very Sad'
    };

    this.moodEntries = Object.entries(this.statsData.moodDistribution)
      .filter(([_, percentage]) => percentage > 0)
      .map(([mood, percentage]) => ({
        label: moodLabels[mood] || mood,
        percentage: Math.round(percentage),
        color: moodColors[mood] || '#94a3b8'
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }

  processSleepData() {
    if (!this.statsData?.sleepDistribution) return;

    const sleepColors: { [key: string]: string } = {
      'FIVE_SIX': '#f87171',
      'SEVEN_EIGHT': '#4ade80',
      'NINE_TEN': '#60a5fa',
      'MORE_THAN_TEN': '#a78bfa'
    };

    const sleepLabels: { [key: string]: string } = {
      'FIVE_SIX': '5-6 hours',
      'SEVEN_EIGHT': '7-8 hours',
      'NINE_TEN': '9-10 hours',
      'MORE_THAN_TEN': '10+ hours'
    };

    this.sleepEntries = Object.entries(this.statsData.sleepDistribution)
      .filter(([_, percentage]) => percentage > 0)
      .map(([sleep, percentage]) => ({
        label: sleepLabels[sleep] || sleep,
        percentage: Math.round(percentage),
        color: sleepColors[sleep] || '#94a3b8'
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }

  onDaysRangeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.daysRange = parseInt(select.value);
    this.getStatsDistribution();
  }

}
