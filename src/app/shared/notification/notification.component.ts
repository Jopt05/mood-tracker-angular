import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  @Input() message: string = '';
  @Input() isError?: boolean;
  @Input() index!: number;
  isOpen = true;
  int = interval(1000);
  sub!: Subscription;
  currentValue = 0;

  constructor(
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    console.log({
      rr: this.isError
    })
    this.sub = this.int.subscribe((val) => {
      if( val === 3 ) {
        this.handleClose();
      }
      this.currentValue = this.currentValue + 1;
    })
  }

  handleClose() {
    this.isOpen = false;
    this.notificationService.removeNotification(this.index);
    this.sub.unsubscribe();
  }
}
