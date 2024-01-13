import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  endpoint = `${environment.api}/users`;

  constructor(
      protected http: HttpClient
  ) {}

  all(page: number): Observable<any> {
    return this.http.get<User>(`${this.endpoint}?page=${page}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<User>(`${this.endpoint}/${id}`);
  }

  update(id: number, data: User): Observable<any> {
    return this.http.put<User>(`${this.endpoint}/${id}`, data);
  }

  create(data: User): Observable<User> {
    return this.http.post<User>(`${this.endpoint}`, data);
  }
}
