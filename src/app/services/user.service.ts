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

  all(page: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}?page=${page}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
    
}
