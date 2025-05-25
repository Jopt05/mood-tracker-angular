import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  private isLoading = new BehaviorSubject(false);

  constructor() { }

  hide() {
    this.isLoading.next(false);
  }

  show() {
    this.isLoading.next(true);
  }

  getIsLoading() {
    return this.isLoading.asObservable();
  }
}
