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

  /* displayCartItems() {
    const cartItemsElement = document.getElementById('cartItems');

    while (cartItemsElement!.firstChild) {
      cartItemsElement!.removeChild(cartItemsElement!.firstChild);
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Für jedes Produkt im Warenkorb ein Listenelement erstellen
    cart.forEach((product: Cart) => {
      const li = document.createElement('li');
      li.textContent = `ID: ${product.productId} - ${product.productName} - €${product.productPrice} - Quantity: ${product.quantity}`;
      cartItemsElement!.appendChild(li);
    });

    const totalQuantity = cart.reduce((total:any, product:any) => {
      return total + product.quantity;
    }, 0);

    this.totalQuantity = totalQuantity;
  } */













  addToCart(productId: number, productName: string, productPrice: number, inStock: number): void {
    //alert('from service: addToCart');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
      if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ productId, productName, productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartItems()
    //this.displayCartItems();
    this.updateTotalInCart();
  }
}