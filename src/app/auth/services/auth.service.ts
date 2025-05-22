import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

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

  registerUser(data: { name?: string, email: string, password: string }) {
    return this.http.post<RegisterResponse>(`${environment.apiKey}/users`, data);
  }

  loginUser(data: { email: string, password: string }) {
    return this.http.post<LoginResponse>(`${environment.apiKey}/users/login`, data);
  }
}
