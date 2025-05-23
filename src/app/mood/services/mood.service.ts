import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

export interface GetMoodsResponse {
  message:    string;
  statusCode: number;
  payload:    Mood[];
}

export interface Mood {
  id:         number;
  mood:       string;
  sleep:      string;
  createdAt:  Date;
  updatedAt:  Date;
  authorId:   number;
  reflection: string;
}

export interface CreateMoodResponse {
  message:    string;
  statusCode: number;
  payload:    Mood;
}



@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor(
    private http: HttpClient
  ) { }

  getMoods() {
    return this.http.get<GetMoodsResponse>(`${environment.apiKey}/moods`)
  }

  createMood(data: { mood: string, sleep: string, reflection?: string}) {
    return this.http.post<CreateMoodResponse>(`${environment.apiKey}/moods`, data)
  }

}
