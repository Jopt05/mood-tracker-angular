import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { catchError, map, of } from "rxjs";

export interface AdviceResponse {
  message:    string;
  statusCode: number;
  payload:    AdviceData;
}

export interface AdviceData {
  advice: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdviceService {

  constructor(
    private http: HttpClient
  ) { }

  getAdvice() {
    return this.http.get<AdviceResponse>(`${environment.apiKey}/advices`).pipe(
      map(response => response?.payload?.advice),
      catchError(err => of(false))
    )
  }

}
