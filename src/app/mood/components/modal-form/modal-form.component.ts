import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoodService } from '../../services/mood.service';
import { NotificationsService } from '../../../shared/notifications.service';

@Component({
  selector: 'app-modal-form',
  standalone: false,
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private moodService: MoodService,
    private notificationService: NotificationsService
  ){}

  moodForm: FormGroup = this.formBuilder.group({
    mood: [''],
    sleep: [''],
    reflection: [null]
  });

  currentStep = 0;
  hasError = false;
  isLoading = false;

  MOODS_LIST = [
    {
      key: 'VERY_HAPPY',
      value: 'Very Happy'
    },
    {
      key: 'HAPPY',
      value: 'Happy'
    },
    {
      key: 'NEUTRAL',
      value: 'Neutral'
    },
    {
      key: 'SAD',
      value: 'Sad'
    },
    {
      key: 'VERY_SAD',
      value: 'Very Sad'
    },
  ];

  SLEEP_LIST = [
    {
      key: 'NINE',
      value: '+9 hours'
    },
    {
      key: 'SEVEN_EIGHT',
      value: '7 - 8 hours'
    },
    {
      key: 'FIVE_SIX',
      value: '5 - 6 hours'
    },
    {
      key: 'THREE_FOUR',
      value: '3 - 4 hours'
    },
    {
      key: 'ZERO_TWO',
      value: '0 - 2 hours'
    },
  ];

  handleSelectItem(formControl: string, value: string) {
    this.moodForm.controls[formControl].setValue(value);
  }

  handleInputChange(event: any) {
    this.moodForm.controls['reflection'].setValue(event.srcElement.value)
  }

  handleClose() {
    this.moodForm.reset();
    this.onClose.emit();
  }

  handleNextStep() {
    if( this.currentStep === 0 && this.moodForm.controls['mood'].value === '' ) {
      this.hasError = true;
      return;
    }
    if( this.currentStep === 1 && this.moodForm.controls['sleep'].value === '' ) {
      this.hasError = true;
      return;
    }
    if( this.currentStep === 2 ) {
      this.isLoading = true;
      this.moodService.createMood({
        mood: this.moodForm.controls['mood'].value,
        sleep: this.moodForm.controls['sleep'].value,
        reflection: this.moodForm.controls['reflection'].value
      }).subscribe({
        next: (response) => {
          this.currentStep = 0;
          this.isLoading = false;
          this.notificationService.addNotification('Mood created successfully')
          this.onClose.emit();
        },
        error: (err) => {
          this.onClose.emit();
          console.log({err})
          this.isLoading = false;
        }
      })
    }
    this.currentStep = this.currentStep + 1;
    this.hasError = false;
  }

}
