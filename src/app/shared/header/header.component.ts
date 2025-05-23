import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ){}

  isLoggedIn = false;
  isModalOpen = false;

  ngOnInit(): void {
      this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn
      });
  }

  logout() {
    this.isModalOpen = false;
    this.authService.logout()
  }

}
