import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  isShowingPassword = false;
  isShowingConfirmation = false;
  errorMessage = "";
  successMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService,
    private router: Router,
    private authService: AuthService,
  ) {}

  passwordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: [this.validatorService.equialsFields('password', 'confirmPassword')]
  })

  handleSubmit() {
    if (this.passwordForm.invalid) {
        this.passwordForm.markAllAsTouched()
        this.getErrorMessage()
        return
    };
    if( !this.getTokenFromParams() ) {
      this.errorMessage = 'Invalid token'
      return
    };
    this.authService.updateUser({ password: this.passwordForm.get('password')?.value }, this.getTokenFromParams()!).subscribe({
      next: (response) => {
        this.successMessage = 'Password updated successfully'
        this.errorMessage = "";
        this.router.navigate(['/login'], { replaceUrl: true })
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
    return this.passwordForm.controls[field].errors && this.passwordForm.controls[field].touched
  }

  getTokenFromParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    return token;
  }

  getErrorMessage() {
    const controlsList = Object.keys(this.passwordForm.controls);
    controlsList.forEach(key => {
      if( this.passwordForm.controls[key].errors ) {
        if( this.passwordForm.controls[key].errors?.['required'] ) {
          this.errorMessage = `${key} is required`
          return
        }
        if( this.passwordForm.controls[key].errors?.['minlength'] ) {
          this.errorMessage = `${key} must be at least 5 characters`
          return
        }
        if( this.passwordForm.controls[key]?.errors?.['equals'] == false ) {
          this.errorMessage = `Passwords do not match`
          return
        }
      }
    })
  }

}
