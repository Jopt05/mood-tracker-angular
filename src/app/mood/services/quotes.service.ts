import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

export interface GetQuoteResponse {
  quote:    string;
  author:   string;
  category: string;
}


@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl = "https://api.api-ninjas.com/v1/quotes";

  getQuote() {
    return this.http.get<GetQuoteResponse[]>(`${this.apiUrl}`, {
      headers: {'X-Api-Key': environment.quotesApiKey}
    });
  }
}
