import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private totalInCartSource = new BehaviorSubject<number>(0);
  currentTotalInCart = this.totalInCartSource.asObservable();

  constructor() { }

  updateTotalInCart() {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const totalinCart = cart.reduce((total: number, product: any) => total + product.quantity, 0);
    this.totalInCartSource.next(totalinCart);
  }
}