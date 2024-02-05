import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: Boolean = false;
  userRole: number = 1;
  
  constructor(protected http: HttpClient) {}

  login<T>(data:T): Observable<T> {
    return this.http.post<T>(`${environment.api}/login`, data);
  }

  register<T>(data:T): Observable<User> {
    return this.http.post<User>(`${environment.api}/register`, data);
  }

  user(): Observable<User> {
    return this.http.get<User>(`${environment.api}/user`).pipe(
      tap(user => this.userRole = user.role.id));
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/logout`, {});
  }

  updateProfile<T>(data:T): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/info`, data);
  }

  updatePassword<T>(data:T): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/password`, data);
  }

  IsAuthenticated(){
    return this.isLogged;
  }

  isRole(){
    return this.userRole;
  }
}