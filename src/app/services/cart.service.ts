import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private toastr: ToastrService,
  ) { }

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
    this.toastr.info('Dein <b>Warenkorb</b> wurde geleert!', '');
  }

  addToCart(
    productId: number, 
    productName: string, 
    productPrice: number, 
    productImage: string,
    inStock: number,
    productSlug: string,
    productShortinfo: string
    ): void {

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);

    this.toastr.success('<b>'+ productName + '</b><br> in Warenkorb gelegt!', '');
    
      if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ 
        productId, 
        productName, 
        productPrice, 
        productImage,
        quantity: 1,
        productSlug,
        productShortinfo
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartItems()
    this.updateTotalInCart();
  }

  formatPrice(totalPrice: number): string {
    return new Intl.NumberFormat('de-CH', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);
  }

  getTotalPrice() {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const totalPrice = cart.reduce((total: number, product: any) => total + product.productPrice * product.quantity, 0);
    return this.formatPrice(totalPrice);
  }

  deleteCartItem(productId: number) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const updatedCart = cart.filter((product: any) => product.productId !== productId);
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
    cart[existingProductIndex].productName;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.loadCartItems();
    this.updateTotalInCart();
    this.toastr.info('<b>'+cart[existingProductIndex].productName + '</b><br>aus Warenkorb entfernt!', '');
  }

  updateCartItemValue(productId: number, title: string, shortinfo: string,  price: number, image: string, inStock: number) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
    cart[existingProductIndex].productName = title;
    cart[existingProductIndex].productShortinfo = shortinfo;
    cart[existingProductIndex].productPrice = price;
    cart[existingProductIndex].productImage = image;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartItems();
    this.updateTotalInCart();
  }

  increaseQuantity(productId: number) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
    cart[existingProductIndex].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartItems();
    this.updateTotalInCart();
  }

  decreaseQuantity(productId: number) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
    if (cart[existingProductIndex].quantity > 1) {
      cart[existingProductIndex].quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartItems();
    this.updateTotalInCart();
  }
  
  /* sumPriceEachProduct(productId: number, productPrice: number) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
    return this.formatPrice(cart[existingProductIndex].quantity * productPrice);
  } */

  sumPriceEachProduct(productId: number, productPrice: number) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);

    if (existingProductIndex === -1) {
      return this.formatPrice(0);
    }
    return this.formatPrice(cart[existingProductIndex].quantity * productPrice);
  }

  totalItemsInCart() {
    const cartString = localStorage.getItem('cart');
    const cart = cartString ? JSON.parse(cartString) : [];
    return cart.reduce((total: number, product: any) => total + product.quantity, 0);
  }
}