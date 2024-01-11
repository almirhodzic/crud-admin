import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../interfaces/user';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = `${environment.api}/users`;

  constructor(
      private http: HttpClient
  ) {}

  all(page: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}?page=${page}`);
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.endpoint}/${id}`);
  }

  create(data: User): Observable<User> {
    return this.http.post<User>(`${this.endpoint}`, data);
  }
    
}
