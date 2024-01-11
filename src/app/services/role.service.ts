import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  endpoint = `${environment.api}/roles`;

  constructor(
      private http: HttpClient
  ) {}

  all(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }
}
