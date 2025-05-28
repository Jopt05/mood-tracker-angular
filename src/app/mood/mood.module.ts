import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './components/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MoodModalComponent } from './components/mood-modal/mood-modal.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ModalFormComponent,
    ChartsComponent,
    MoodModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ]
})
export class MoodModule { }
