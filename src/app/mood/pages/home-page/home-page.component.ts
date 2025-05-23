import { Component, OnInit } from '@angular/core';
import { AuthService, UserPayload } from '../../../auth/services/auth.service';
import { Mood, MoodService } from '../../services/mood.service';
import { QuotesService } from '../../services/quotes.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private quoteService: QuotesService
  ) {}

  isLoading = true;
  isEmpty = false;
  userData: UserPayload | null = null;
  currentDate = new Date().toDateString();
  todaysMood?: Mood;
  quote?: string;
  isModalOpen = false;

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
        if( response.payload.length == 0 ) {
          this.isEmpty = true;
          return
        }
        const moodsList = response.payload;
        this.setTodaysMood(moodsList);
      },
      error: (err) => {
        console.log({err})
      }
    });
    this.quoteService.getQuote().subscribe({
      next: (response) => {
        this.quote =  response?.[0]?.quote
      },
      error: (err) => {
        console.log({err})
      }
    })
  };

  handleClose() {
    this.isModalOpen = false;
  }

  setTodaysMood(moodList: Mood[]) {
    const currentDate = new Date().toLocaleDateString();
    const todaysMood = moodList.find( m => new Date(m.createdAt).toLocaleDateString() == currentDate );
    if( todaysMood ) {
      this.todaysMood = todaysMood;
      return
    }
    this.isEmpty = true;
  }

}
