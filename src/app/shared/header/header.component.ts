import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ){}

  isDarkTheme = false;
  isLoggedIn = false;
  isModalOpen = false;

  ngOnInit(): void {
      this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn
      });
      this.getTheme();
  }

  getTheme() {
    const isDarkTheme = localStorage.getItem('isDarkTheme');
    if( !isDarkTheme ) {
      this.isDarkTheme = false;
      this.themeService.deactivate();
      return;
    } else {
      if (isDarkTheme === 'true') {
        this.isDarkTheme = true;
        this.themeService.activate();
      } else {
        this.isDarkTheme = false;
        this.themeService.deactivate();
      }
    }
    this.themeService.getTheme().subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme
      this.applyThemeToHtml();
    });
  }

  applyThemeToHtml() {
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      if (this.isDarkTheme) {
        htmlTag.classList.add('darkHtml');
      } else {
        htmlTag.classList.remove('darkHtml');
      }
    }
  }

  toggleTheme() {
    if (this.isDarkTheme) {
      this.themeService.deactivate();
    } else {
      this.themeService.activate();
    }
  }

  logout() {
    this.isModalOpen = false;
    this.authService.logout()
  }

}
