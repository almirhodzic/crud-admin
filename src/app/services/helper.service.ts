import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  formatPrice(totalPrice: number): string {
    return 'Fr. '+ new Intl.NumberFormat('de-CH', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalPrice) + '.–';
  }
}
