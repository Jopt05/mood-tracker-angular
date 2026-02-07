import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './components/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MoodModalComponent } from './components/mood-modal/mood-modal.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StatsDistributionComponent } from './components/stats-distribution/stats-distribution.component';
import { StatsAverageComponent } from './components/stats-average/stats-average.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ModalFormComponent,
    ChartsComponent,
    MoodModalComponent,
    CalendarComponent,
    StatsDistributionComponent,
    StatsAverageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ]
})
export class MoodModule { }
