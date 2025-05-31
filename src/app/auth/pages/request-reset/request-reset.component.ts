import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-request-reset',
  standalone: false,
  templateUrl: './request-reset.component.html',
  styleUrl: './request-reset.component.css'
})
export class RequestResetComponent {

  errorMessage = "";
  successMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  emailForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })

  handleSubmit() {
    if (this.emailForm.invalid) {
        this.emailForm.markAllAsTouched()
        this.getErrorMessage()
        return
    };
    this.authService.sendPasswordResetEmail(this.emailForm.get('email')?.value).subscribe({
      next: (response) => {
        this.successMessage = 'Email sent successfully'
        this.errorMessage = "";
        this.router.navigate(['/login'])
      },
      error: (error: any) => {
        if( error?.error?.error ) {
          this.errorMessage = error?.error?.error;
          return
        }
        this.errorMessage = 'Something went wrong'
      }})
  }

  isInvalidField = (field: string) => {
    return this.emailForm.controls[field].errors && this.emailForm.controls[field].touched
  }

  getErrorMessage() {
    const controlsList = Object.keys(this.emailForm.controls);
    controlsList.forEach(key => {
      if( this.emailForm.controls[key].errors ) {
        if( this.emailForm.controls[key].errors?.['required'] ) {
          this.errorMessage = `${key} is required`
          return
        }
        if( this.emailForm.controls[key].errors?.['email'] ) {
          this.errorMessage = `Thats not a valid email`
          return
        }
      }
    })
  }

}
