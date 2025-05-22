import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public isLoggedIn = new BehaviorSubject(false);

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  registerUser(data: { name?: string, email: string, password: string }) {
    return this.http.post<RegisterResponse>(`${environment.apiKey}/users`, data);
  }

  loginUser(data: { email: string, password: string }) {
    return this.http.post<LoginResponse>(`${environment.apiKey}/users/login`, data);
  }
}
