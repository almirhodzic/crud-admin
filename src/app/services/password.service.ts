import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  endpoint = `${environment.api}`;
  constructor(
    private http: HttpClient,
  ) { }

  requestPasswordReset<T>(email: T): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/request/passreset/${email}`);
  }

  validatePasswordResetToken<T>(token: T): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/request/passreset/validate-token/${token}`);
  }

  updatePassword<T>(token: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/update-password/${token}`, data);
  }
}
