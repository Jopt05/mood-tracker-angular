import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { MoodPipePipe } from './pipes/mood-pipe.pipe';
import { SleepPipe } from './pipes/sleep.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe
  ]
})
export class SharedModule { }
