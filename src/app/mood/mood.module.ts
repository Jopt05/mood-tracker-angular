import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomePageComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MoodModule { }
