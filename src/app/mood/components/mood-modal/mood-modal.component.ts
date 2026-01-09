import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Mood, MoodService } from '../../services/mood.service';

@Component({
  selector: 'app-mood-modal',
  standalone: false,
  templateUrl: './mood-modal.component.html',
  styleUrl: './mood-modal.component.css'
})
export class MoodModalComponent implements OnInit {
  @ViewChild('card') moodCard!: ElementRef;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>()

  moods: Mood[] = [];
  isLoadingMore = false;
  currentPage = 1;
  total = 0;
  hasReachedEnd = false;
  selectedMood: Mood | null = null;

  constructor(
    private moodService: MoodService
  ) {}

  ngOnInit(): void {
    this.isLoadingMore = true;
    this.getMoods();
  }

  onDaySelected(mood: Mood) {
    this.selectedMood = mood;
    setTimeout(() => {
      this.moodCard.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  getMoods() {
    this.moodService.getMoodsWithPagination(this.currentPage).subscribe((response) => {
      this.moods = [...this.moods, ...response.payload.mood];
      this.currentPage = this.currentPage + 1;
      this.total = response.payload.total;
      this.isLoadingMore = false;
    })
  }

  handleClose() {
    this.moods = [];
    this.currentPage = 1;
    this.total = 0;
    this.selectedMood = null;
    this.onClose.emit();
  }

  onScroll(event: any) {
    if( this.isLoadingMore ) return;
    if( this.moods.length === this.total ) {
      this.hasReachedEnd = true;
      return
    };
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.isLoadingMore = true;
      this.moodService.getMoodsWithPagination(this.currentPage).subscribe((response) => {
        this.moods = [...this.moods, ...response.payload.mood];
        this.currentPage = this.currentPage + 1;
        this.isLoadingMore = false;
      })
    }
  }

}
