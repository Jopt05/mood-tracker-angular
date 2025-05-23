import { Component, OnInit } from '@angular/core';
import { AuthService, UserPayload } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  isLoading = true;
  userData: UserPayload | null = null;
  currentDate = new Date().toDateString();

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
    })
  }

}
