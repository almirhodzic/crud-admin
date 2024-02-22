import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public uuid!: string;

  constructor(
    protected http: HttpClient
    ) {}

  setUuid(uuid: string) {
    this.uuid = uuid;
  }

  getUuid(): string {
    return this.uuid;
  }

  login<T>(data:T): Observable<T> {
    return this.http.post<T>(`${environment.api}/login`, data);
  }

  register<T>(data:T): Observable<User> {
    return this.http.post<User>(`${environment.api}/register`, data);
  }

  user(): Observable<User> {
    return this.http.get<User>(`${environment.api}/user`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/logout`, {});
  }

  updatePassword<T>(data:T): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/password`, data);
  }

  getCurrentUserId(): Observable<number | string> {
    return this.user().pipe(
      map(user => user.id)
    );
  }

  getCurrentUserUuid(): Observable<number | string> {
    return this.user().pipe(
      map(user => user.uuid)
    );
  }
}