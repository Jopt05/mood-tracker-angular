import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

export interface GetQuoteResponse {
  advice: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl = "https://api.api-ninjas.com/v1/advice";

  getQuote() {
    return this.http.get<GetQuoteResponse>(`${this.apiUrl}`, {
      headers: {'X-Api-Key': environment.quotesApiKey}
    });
  }
}
