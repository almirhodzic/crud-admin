import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract get endpoint(): string;

  constructor(
      protected http: HttpClient
  ) {}

  all(page?: number): Observable<any> {
    let url = this.endpoint;
    if (page) { url += `?page=${page}`; }
    return this.http.get(url);
  }

  create<T>(data: T): Observable<T> {
    return this.http.post<T>(`${this.endpoint}`, data);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  update<T>(id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
