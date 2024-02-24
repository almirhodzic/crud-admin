import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css', './../nav/nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BasketComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();

  constructor(
    public cartService: CartService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  cartItems: any[] = [];
  totalInCart: number = 0;

  ngOnInit() {
    this.cartService.updateTotalInCart();
    this.loadCartItems();
    this.subscription.add(this.cartService.currentTotalInCart.subscribe(total => {
    this.totalInCart = total;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatPrice(totalPrice: number): string {
    return this.cartService.formatPrice(totalPrice);
  }

  loadCartItems() {
    this.cartService.loadCartItems();
  }

  clearCart() {
    this.loaderService.setLoading(true);
    setTimeout(() => {
      this.loaderService.setLoading(false);
      this.cartService.clearCart();
      location.reload();
    }, 1000);
  };

  deleteCartItem(productId: number) {
    if(confirm(`Produkt (Id: ${productId}) aus Warenkorb entfernen?`)) {
      this.cartService.deleteCartItem(productId);
    }
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
