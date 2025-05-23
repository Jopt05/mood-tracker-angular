import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { MoodPipePipe } from './pipes/mood-pipe.pipe';
import { SleepPipe } from './pipes/sleep.pipe';
import { MoodToImagePipe } from './pipes/mood-to-image.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe,
    MoodToImagePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe,
    MoodToImagePipe,
  ]
})
export class SharedModule { }
