import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}

  errorMessage?: string;
  successMessage?: string;
  isLoading = false;
  isRegistering = true;

  public loginForm: FormGroup = this._fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  isInvalidField = (field: string) => {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched
  }

  toggleIsRegistering() {
    this.isRegistering = !this.isRegistering;
  }

  handleSubmit() {
    this.isLoading = true;
    if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched()
        return
    }
    // this.loginForm.reset()
    if( this.isRegistering ) {
      this.authService.registerUser({
        name: this.loginForm.get('name')?.value,
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }).subscribe({
        next: (response) => {
          this.successMessage = 'Registered correctly!'
          this.isRegistering = false;
          this.errorMessage = undefined;
          this.successMessage = undefined;
        },
        error: (error: any) => {
          if( error?.error?.error ) {
            this.errorMessage = error?.error?.error;
            return
          }
          this.errorMessage = 'Something went wrong'
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    } else {
      this.authService.loginUser({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }).subscribe({
        next: (response) => {
          this.successMessage = 'Logged in successfully'
          localStorage.setItem('token', response.payload.token);
          this.errorMessage = undefined;
        },
        error: (error: any) => {
          if( error?.error?.error ) {
            this.errorMessage = error?.error?.error;
            return
          }
          this.errorMessage = 'Something went wrong'
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

}
