import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { MoodPipePipe } from './pipes/mood-pipe.pipe';
import { SleepPipe } from './pipes/sleep.pipe';
import { MoodToImagePipe } from './pipes/mood-to-image.pipe';
import { FooterComponent } from './footer/footer.component';
import { FullLoaderComponent } from './full-loader/full-loader.component';
import { RouterModule } from '@angular/router';
import { NotificationsContainerComponent } from './notifications-container/notifications-container.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe,
    MoodToImagePipe,
    FooterComponent,
    FullLoaderComponent,
    NotificationsContainerComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe,
    MoodToImagePipe,
    FooterComponent,
    FullLoaderComponent,
    NotificationsContainerComponent
  ]
})
export class SharedModule { }
