import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/interfaces/cart';

import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../nav.component.css']
})
export class CartComponent implements OnInit {

  totalInCart: number | undefined = 0;
  isCartOpen = false;

  constructor(
    private eRef: ElementRef,
    private cartService: CartService,
    ) {}


    @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (this.isCartOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isCartOpen = false;
    }
  }

    closeCart(event: MouseEvent) {
      this.isCartOpen = false;
      event.stopPropagation();
    }

    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    }

  ngOnInit() {
    this.cartService.currentTotalInCart.subscribe(total => {
      this.totalInCart = total;
    });
    this.cartService.updateTotalInCart();
  }
}
