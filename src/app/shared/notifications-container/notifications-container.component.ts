import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications-container',
  standalone: false,
  templateUrl: './notifications-container.component.html',
  styleUrl: './notifications-container.component.css'
})
export class NotificationsContainerComponent implements OnInit {

  notifications: string[] = [];

  constructor(
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
      this.notificationService.notifications.asObservable().subscribe((notifications) => {
        this.notifications = notifications;
      })
  }

  createNot() {
    this.notificationService.addNotification('Mensaje largo de prueba de notificaciones')
  }

}
