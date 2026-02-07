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

export interface StatsDistributionResponse {
  message:    string;
  statusCode: number;
  payload:    StatsDistributionPayload;
}

export interface StatsDistributionPayload {
  moodDistribution: { [key: string]: number };
  sleepDistribution: { [key: string]: number };
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

  getMoodsByMonthAndYear(month: number, year: number) {
    return this.http.get<GetMoodsResponse>(`${environment.apiKey}/moods?month=${month}&year=${year}&limit=100`)
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

  updateMood(id: number, data: { mood: string, sleep: string, reflection?: string}) {
    return this.http.put<CreateMoodResponse>(`${environment.apiKey}/moods/${id}`, data).pipe(
      tap(response => {
        this.moodsList.next(this.moodsList.value.map(mood => mood.id === id ? response.payload : mood))
      })
    )
  }

  getStatsDistribution(daysRange: number = 30) {
    return this.http.get<StatsDistributionResponse>(`${environment.apiKey}/stats/distribution?days=${daysRange}`)
  }

}
