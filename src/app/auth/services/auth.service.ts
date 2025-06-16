import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse {
  message:    string;
  statusCode: number;
  payload:    LoginPayload;
}

export interface LoginPayload {
  token: string;
}

export interface RegisterResponse {
  message:    string;
  statusCode: number;
  payload:    RegisterPayload;
}

export interface RegisterPayload {
  id:        number;
  email:     string;
  name:      string;
  password:  string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUserResponse {
  message:    string;
  statusCode: number;
  payload:    UserPayload;
}

export interface UserPayload {
  id:        number;
  email:     string;
  name:      string;
  password:  string;
  createdAt: Date;
  updatedAt: Date;
  photoUrl?: string;
}

export interface UpdateData { name?: string, email?: string, file?: any, password?: string }

export interface RegisterData { name?: string, email: string, password: string };

export interface LoginData { email: string, password: string }


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private isLoggedIn = new BehaviorSubject(false);
  private userData = new BehaviorSubject<UserPayload | null>(null )

  getCurrentUserInfo() {
    return this.userData.asObservable();
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  getCurrentUser() {
    return this.http.get<GetUserResponse>(`${environment.apiKey}/users`).pipe(
      tap(response => {
        this.userData.next(response.payload);
        this.isLoggedIn.next(true);
      })
    )
  }

  updateUser(data: UpdateData, token: string) {
    let formData = new FormData();
    if( data.name ) formData.append('name', data.name);
    if( data.file ) formData.append('file', data.file);
    return this.http.put<RegisterResponse>(`${environment.apiKey}/users`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).pipe(
      tap(response => {
        this.userData.next(response.payload);
      })
    );
  }

  sendPasswordResetEmail(userEmail: string) {
    return this.http.post(`${environment.apiKey}/users/auth/reset-password`, {email: userEmail}).pipe(
      map(response => {
        return of(true);
      }),
      catchError(error => {
        return of(false);
      })
    );
  }

  registerUser(data: RegisterData) {
    return this.http.post<RegisterResponse>(`${environment.apiKey}/users`, data);
  }

  loginUser(data: LoginData) {
    return this.http.post<LoginResponse>(`${environment.apiKey}/users/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this.isLoggedIn.next(false);
    this.router.navigate(['/login'])
  }
}
