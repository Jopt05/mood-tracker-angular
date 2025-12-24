import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mood, MoodService } from '../../services/mood.service';
import { NotificationsService } from '../../../shared/notifications.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-form',
  standalone: false,
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent implements OnInit {
  @Input() isEditingMood: boolean = false;
  @Input() moodData?: Mood;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private formBuilder: FormBuilder,
    private moodService: MoodService,
    private notificationService: NotificationsService
  ){}

  ngOnInit(): void {
    if( !this.isEditingMood ) return;
    console.log(this.moodData?.reflection)
    this.moodForm.patchValue({
      mood: this.moodData?.mood,
      sleep: this.moodData?.sleep,
      reflection: this.moodData?.reflection
    })
  }

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

  async createMood() {
    this.isLoading = true;
    const creationResponse = await firstValueFrom(
      this.moodService.createMood({
        mood: this.moodForm.controls['mood'].value,
        sleep: this.moodForm.controls['sleep'].value,
        reflection: this.moodForm.controls['reflection'].value
      })
    )
    this.currentStep = 0;
    this.isLoading = false;
    this.notificationService.addNotification('Mood created successfully')
    this.onClose.emit();
  }

  async updateMood() {
    this.isLoading = true;
    const updateResponse = await firstValueFrom(
      this.moodService.updateMood(this.moodData?.id!, {
        mood: this.moodForm.controls['mood'].value,
        sleep: this.moodForm.controls['sleep'].value,
        reflection: this.moodForm.controls['reflection'].value
      })
    )
    this.currentStep = 0;
    this.isLoading = false;
    this.notificationService.addNotification('Mood updated successfully')
    this.onClose.emit();
  }

  async handleNextStep() {
    if( this.currentStep === 0 && this.moodForm.controls['mood'].value === '' ) {
      this.hasError = true;
      return;
    }
    if( this.currentStep === 1 && this.moodForm.controls['sleep'].value === '' ) {
      this.hasError = true;
      return;
    }
    if( this.currentStep === 2 ) {
      if( this.isEditingMood ) {
        await this.updateMood();
        return;
      }
      await this.createMood();
      return;
    }
    this.currentStep = this.currentStep + 1;
    this.hasError = false;
  }

}
