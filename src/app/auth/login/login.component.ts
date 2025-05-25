import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginData, RegisterData } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

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
    private router: Router
  ) {}

  errorMessage?: string;
  successMessage?: string;
  isLoading = false;
  isRegistering = true;
  isShowingPassword = false;

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

  getErrorMessage() {
    const controlsList = Object.keys(this.loginForm.controls);
    controlsList.forEach(key => {
      if( this.loginForm.controls[key].errors ) {
        if( this.loginForm.controls[key].errors?.['required'] ) {
          this.errorMessage = `${key} is required`
          return
        }
        if( this.loginForm.controls[key].errors?.['minlength'] ) {
          this.errorMessage = `${key} must be at least 5 characters`
          return
        }
        if( this.loginForm.controls[key].errors?.['email'] ) {
          this.errorMessage = `${key} must be a valid email`
          return
        }
      }
    })
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched()
        this.getErrorMessage()
        return
    }
    this.isLoading = true;
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
          this.authService.loginUser({
            email: this.loginForm.get('email')?.value,
            password: this.loginForm.get('password')?.value
          }).subscribe({
            next: (response) => {
              this.successMessage = 'Logged in successfully'
              localStorage.setItem('token', response.payload.token);
              this.errorMessage = undefined;
              this.router.navigate([''])
              this.authService.setIsLoggedIn(true);
            },
            error: (error: any) => {
              if( error?.error?.error ) {
                this.errorMessage = error?.error?.error;
                this.isLoading = false;
                return
              }
              this.errorMessage = 'Something went wrong'
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false;
            }
      })
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
          this.router.navigate([''])
          this.authService.setIsLoggedIn(true);
        },
        error: (error: any) => {
          if( error?.error?.error ) {
            this.errorMessage = error?.error?.error;
            this.isLoading = false;
            return
          }
          this.errorMessage = 'Something went wrong'
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

}
