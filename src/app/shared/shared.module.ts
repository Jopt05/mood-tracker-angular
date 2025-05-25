import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { MoodPipePipe } from './pipes/mood-pipe.pipe';
import { SleepPipe } from './pipes/sleep.pipe';
import { MoodToImagePipe } from './pipes/mood-to-image.pipe';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe,
    MoodToImagePipe,
    FooterComponent,
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
    FooterComponent
  ]
})
export class SharedModule { }
