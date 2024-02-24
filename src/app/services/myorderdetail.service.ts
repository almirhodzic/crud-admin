import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyOrderDetailService extends RestService {
  endpoint = `${environment.api}/myorder-detail`;
}
