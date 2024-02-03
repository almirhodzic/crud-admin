import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(
    private http: HttpClient,
  ) { }

  create<T>(data: T): Observable<T> {
    return this.http.post<T>(`${environment.api}/create-user`, data);
  }

}
