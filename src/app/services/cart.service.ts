import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  totalQuantity: number | undefined = 0;
  totalInCart: number = 0;
  cartItems: any[] = [];
  
  private totalInCartSource = new BehaviorSubject<number>(0);
  currentTotalInCart = this.totalInCartSource.asObservable();

  constructor() { }

  updateTotalInCart() {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const totalinCart = cart.reduce((total: number, product: any) => total + product.quantity, 0);
    return this.totalInCartSource.next(totalinCart);
  }

  loadCartItems() {
    const cartStrings = localStorage.getItem('cart');
    if (cartStrings) {
      this.cartItems = JSON.parse(cartStrings);
    }
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.loadCartItems();
    this.updateTotalInCart();
  }

  addToCart(
    productId: number, 
    productName: string, 
    productPrice: number, 
    productImage: string,
    inStock: number,
    productSlug: string
    ): void {

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
      if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ 
        productId, 
        productName, 
        productPrice, 
        productImage,
        quantity: 1,
        productSlug
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartItems()
    this.updateTotalInCart();
  }

  formatTotalPrice(totalPrice: number): string {
    return new Intl.NumberFormat('de-CH', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);
  }

  getTotalPrice() {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const totalPrice = cart.reduce((total: number, product: any) => total + product.productPrice * product.quantity, 0);
    return this.formatTotalPrice(totalPrice);
  }

  deleteCartItem(productId: number) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const updatedCart = cart.filter((product: any) => product.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.loadCartItems();
    this.updateTotalInCart();
  }
}