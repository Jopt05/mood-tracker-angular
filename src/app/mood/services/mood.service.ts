import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, of, tap } from 'rxjs';

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

  private moodsList = new BehaviorSubject<Mood[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getMoodsAsObservable() {
    return this.moodsList.asObservable();
  }

  getMoods() {
    return this.http.get<GetMoodsResponse>(`${environment.apiKey}/moods`).pipe(
      tap(response => {
        this.moodsList.next(response.payload)
      })
    )
  }

  createMood(data: { mood: string, sleep: string, reflection?: string}) {
    return this.http.post<CreateMoodResponse>(`${environment.apiKey}/moods`, data).pipe(
      tap(response => {
        this.moodsList.next([...this.moodsList.value, response.payload])
      })
    )
  }

}
