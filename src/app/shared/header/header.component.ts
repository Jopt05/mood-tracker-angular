import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, UserPayload } from '../../auth/services/auth.service';
import { ThemeService } from '../services/theme.service';
import { LoadingServiceService } from '../services/loading-service.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private loadingService: LoadingServiceService
  ){}

  isDarkTheme = false;
  isLoggedIn = false;
  isModalOpen = false;
  userData?: UserPayload;

  ngOnInit(): void {
      this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn
      });
      this.authService.getCurrentUserInfo().subscribe((userData) => {
        this.userData = userData || undefined;
      });
      this.getTheme();
  }

  getTheme() {
    this.themeService.getTheme().subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme
      this.applyThemeToHtml();
    });

    const isDarkTheme = localStorage.getItem('isDarkTheme');
    if( isDarkTheme === undefined ) return;
    if (isDarkTheme === 'true') {
      this.themeService.activate();
    } else {
      this.themeService.deactivate();
    }
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

  handleResetPassword() {
    if( !this.userData ) return;
    this.loadingService.show();
    this.authService.sendPasswordResetEmail( this.userData.id ).subscribe((response) => {
      if( response ) {
        this.loadingService.hide();
      };
    })
  }

  toggleTheme() {
    if (this.isDarkTheme) {
      this.themeService.deactivate();
      localStorage.setItem('isDarkTheme', 'false');
    } else {
      this.themeService.activate();
      localStorage.setItem('isDarkTheme', 'true');
    }
  }

  logout() {
    this.isModalOpen = false;
    this.authService.logout()
  }

}
