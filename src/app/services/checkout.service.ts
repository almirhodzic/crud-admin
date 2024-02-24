
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

endpoint = `${environment.api}`;
  constructor(
    private http: HttpClient,
  ) { }

  test<T>(data: T): Observable<T> {
    return this.http.post<T>(`${this.endpoint}/checkout/test/`, data);
  }

  checkout<T>(data: T): Observable<T> {
    return this.http.post<T>(`${this.endpoint}/checkout`, data);
  }

  validatePasswordResetToken<T>(token: T): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/request/passreset/validate-token/${token}`);
  }

  updatePassword<T>(data: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/update-password`, data);
  }
}
