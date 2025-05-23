import { Component, OnInit } from '@angular/core';
import { AuthService, UserPayload } from '../../../auth/services/auth.service';
import { Mood, MoodService } from '../../services/mood.service';

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
  ) {}

  isLoading = true;
  userData: UserPayload | null = null;
  currentDate = new Date().toDateString();
  todaysMood?: Mood;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.authService.getCurrentUserInfo().subscribe({
      next: (response) => {
        this.userData = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.log({err})
      }
    });
    this.moodService.getMoods().subscribe({
      next: (response) => {
        const moodsList = response.payload;
        const currentDate = new Date().toLocaleDateString();
        const todaysMood = moodsList.find( m => new Date(m.createdAt).toLocaleDateString() == currentDate );
        if( todaysMood ) {
          this.todaysMood = todaysMood;
        }
      },
      error: (err) => {
        console.log({err})
      }
    })
  }

}
