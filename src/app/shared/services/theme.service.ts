import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public isDarkTheme = new BehaviorSubject(false);

  constructor() { }

  activate() {
    this.isDarkTheme.next(true);
    localStorage.setItem('isDarkTheme', 'true');
  }

  deactivate() {
    this.isDarkTheme.next(false);
    localStorage.setItem('isDarkTheme', 'false');
  }

  getTheme() {
    return this.isDarkTheme.asObservable();
  }
}
