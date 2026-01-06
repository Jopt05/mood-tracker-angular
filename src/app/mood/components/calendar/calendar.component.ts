import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Mood, MoodService } from '../../services/mood.service';
import { firstValueFrom } from 'rxjs';

interface CalendarDay {
  date: Date | null;
  disabled: boolean;
  status?: string;
  mood?: Mood;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: false
})
export class CalendarComponent implements OnInit {

  constructor(private moodService: MoodService) {}

  @Output() daySelected = new EventEmitter<Mood>();

  currentMonth = new Date();
  moodList: Mood[] = [];
  days: CalendarDay[] = [];
  monthLabel = '';

  ngOnInit() {
    this.getMoods();
  }

  async getMoods() {
    const response = await firstValueFrom(
      this.moodService.getMoodsByMonthAndYear(this.currentMonth.getMonth() + 1, this.currentMonth.getFullYear())
    );

    this.moodList = response.payload.mood;
    console.log(this.moodList)
    this.buildCalendar();
  }

  buildCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    this.monthLabel = this.currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

    const infoMap = new Map(
      this.moodList.map(d => [new Date(d.createdAt).toISOString().split('T')[0], d.mood])
    );

    this.days = [];

    for (let i = 0; i < startOffset; i++) {
      this.days.push({
        date: null,
        disabled: true
      });
    }

    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      const date = new Date(year, month, d);
      const key = date.toISOString().split('T')[0];
      const status = infoMap.get(key);

      this.days.push({
        date,
        disabled: status === undefined,
        status: status,
        mood: this.moodList.find(m => new Date(m.createdAt).toISOString().split('T')[0] === key)
      });
    }

    while (this.days.length % 7 !== 0) {
      this.days.push({
        date: null,
        disabled: true
      });
    }
  }

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.getMoods();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.getMoods();
  }

  selectDay(day: CalendarDay) {
    if (day.date && !day.disabled) {
      this.daySelected.emit(day.mood);
    }
  }

  trackByIndex(index: number) {
    return index;
  }
}
