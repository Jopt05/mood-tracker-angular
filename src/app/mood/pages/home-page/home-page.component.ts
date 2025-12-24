import { Component, OnInit } from '@angular/core';
import { AuthService, UserPayload } from '../../../auth/services/auth.service';
import { Mood, MoodService } from '../../services/mood.service';
import { environment } from '../../../../environment/environment';
import { AdviceService } from '../../services/advice.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private moodService: MoodService,
    private adviceService: AdviceService,
  ) {}

  isLoading = true;
  isEmpty = false;
  userData: UserPayload | null = null;
  currentDate = new Date().toDateString();
  todaysMood?: Mood;
  quote?: string;
  isModalOpen = false;
  isMoodModalOpen = false;
  moodData: Mood[] = [];
  averageMood?: string;
  averageSleep?: string;
  isEditingMood: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.getUserInfo();
    this.getMoods();
    this.getQuotes();
  };

  getMoods() {
    this.moodService.getMoods().subscribe({
      next: (response) => {
        this.moodService.getMoodsAsObservable().subscribe((moods) => {
          if( moods.length == 0 ) {
            this.isEmpty = true;
            this.moodData = [];
            return
          }
          this.isEmpty = false;
          this.moodData = moods;
          this.setTodaysMood(this.moodData);
          this.getMostRepeatedMood(this.moodData);
          this.getAverageSleepSchedule(this.moodData);
        })
      },
      error: (err) => {
        console.log({err})
      }
    });
  }

  getUserInfo() {
    this.authService.getCurrentUserInfo().subscribe({
      next: (response) => {
        this.userData = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.log({err})
      }
    });
  }

  getQuotes() {
    if( environment.getQuotes == false ) return;
    this.adviceService.getAdvice().subscribe({
      next: (response) => {
        if( response == false ) return;
        this.quote = response as string;
      },
      error: (err) => {
        console.log({err})
      }
    })
  }

  handleClose(modalToClose: 'form' | 'checkin') {
    if( modalToClose === 'form' ) this.isModalOpen = false;
    if( modalToClose === 'checkin' ) this.isMoodModalOpen = false;
  }

  handleOpenMoodModal() {
    this.isMoodModalOpen = true;
  }

  handleEditTodaysMood() {
    this.isModalOpen = true;
    this.isEditingMood = true;
  }

  setTodaysMood(moodList: Mood[]) {
    const currentDate = new Date().toLocaleDateString();
    const todaysMood = moodList.find( m => new Date(m.createdAt).toLocaleDateString() == currentDate );
    if( todaysMood ) {
      this.todaysMood = todaysMood;
      return
    }
    this.isEmpty = true;
  };

  getMostRepeatedMood(moodList: Mood[]) {
    if( moodList.length === 0 ) return;
    const moodCount = moodList.reduce((acc: any, mood: Mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});
    const mostRepeatedMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);
    this.averageMood = mostRepeatedMood;
  }

  getAverageSleepSchedule(moodList: Mood[]) {
    if( moodList.length === 0 ) return;
    const sleepCount = moodList.reduce((acc: any, mood: Mood) => {
      acc[mood.sleep] = (acc[mood.sleep] || 0) + 1;
      return acc;
    }, {});
    const mostRepeatedSleep = Object.keys(sleepCount).reduce((a, b) => sleepCount[a] > sleepCount[b] ? a : b);
    this.averageSleep = mostRepeatedSleep;
  }

}
