import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from './interfaces/Notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications = new BehaviorSubject<Notification[]>([]);

  constructor() { }

  addNotification(message: string, isError?: boolean) {
    const currentNotifications = this.notifications.getValue();
    this.notifications.next([...currentNotifications, {message, isError}]);
  }

  removeNotification(index: number) {
    const currentNotifications = this.notifications.getValue();
    currentNotifications.splice(index, 1);
    this.notifications.next([...currentNotifications]);
  }
}
