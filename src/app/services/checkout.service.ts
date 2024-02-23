
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService extends RestService {
  endpoint = `${environment.api}/checkout`;
}
