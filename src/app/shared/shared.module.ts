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



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    MoodPipePipe,
    SleepPipe,
    MoodToImagePipe,
    FooterComponent,
    FullLoaderComponent,
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
    FullLoaderComponent
  ]
})
export class SharedModule { }
