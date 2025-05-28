import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, of, tap } from 'rxjs';

export interface GetMoodsResponse {
  message:    string;
  statusCode: number;
  payload:    Payload;
}

export interface Payload {
  page:     number;
  limit:    number;
  total:    number;
  next:     string;
  previous: null;
  mood:     Mood[];
}

export interface Mood {
  id:         number;
  mood:       string;
  sleep:      string;
  createdAt:  Date;
  updatedAt:  Date;
  authorId:   number;
  reflection: null | string;
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

  getMoodsWithPagination(page = 1) {
    return this.http.get<GetMoodsResponse>(`${environment.apiKey}/moods?page=${page}`)
  }

  getMoods() {
    return this.http.get<GetMoodsResponse>(`${environment.apiKey}/moods`).pipe(
      tap(response => {
        this.moodsList.next(response.payload.mood)
      })
    )
  }

  createMood(data: { mood: string, sleep: string, reflection?: string}) {
    return this.http.post<CreateMoodResponse>(`${environment.apiKey}/moods`, data).pipe(
      tap(response => {
        this.moodsList.next([response.payload,...this.moodsList.value])
      })
    )
  }

}
