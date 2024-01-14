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

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.endpoint}`, data);
  }
}
