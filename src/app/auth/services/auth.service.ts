import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, map, of, tap } from 'rxjs';

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
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
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
      })
    )
  }

  registerUser(data: { name?: string, email: string, password: string }) {
    return this.http.post<RegisterResponse>(`${environment.apiKey}/users`, data);
  }

  loginUser(data: { email: string, password: string }) {
    return this.http.post<LoginResponse>(`${environment.apiKey}/users/login`, data);
  }
}
