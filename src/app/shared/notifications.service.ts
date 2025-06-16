import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications = new BehaviorSubject<string[]>([]);

  constructor() { }

  addNotification(message: string) {
    const currentNotifications = this.notifications.getValue();
    this.notifications.next([...currentNotifications, message]);
  }

  removeNotification(index: number) {
    const currentNotifications = this.notifications.getValue();
    currentNotifications.splice(index, 1);
    this.notifications.next([...currentNotifications]);
  }
}
