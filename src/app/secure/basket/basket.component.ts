import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css', './../nav/nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BasketComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();

  constructor(
    private cdr: ChangeDetectorRef,
    public cartService: CartService,
    private router: Router,
  ) { }

  cartItems: any[] = [];
  totalInCart: number = 0;

  ngOnInit(): void {
    this.cartService.updateTotalInCart();
    this.loadCartItems();
    
    this.subscription.add(this.cartService.currentTotalInCart.subscribe(total => {
    this.totalInCart = total;
    }));
    this.subscription.add(this.cartService.cartCleared.subscribe(cleared => {
      if (cleared) {
        this.cartItems = []; // Warenkorb in der Komponente leeren
        this.cartService.cartCleared.next(false); // Zurücksetzen, optional
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatPrice(totalPrice: number): string {
    return new Intl.NumberFormat('de-CH', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice);
  }

  loadCartItems() {
    this.cartService.loadCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.router.navigate(['/shop']);
  };

  deleteCartItem(productId: number) {
    this.cartService.deleteCartItem(productId);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  sumPriceEachProduct(productId: number, productPrice: number) {
    return this.cartService.sumPriceEachProduct(productId, productPrice);
  }
}
