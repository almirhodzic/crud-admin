import { Component, OnInit } from '@angular/core';
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

  constructor(
    private cartService: CartService,
    ) {}

  ngOnInit() {
    this.cartService.currentTotalInCart.subscribe(total => {
      this.totalInCart = total;
    });
    this.cartService.updateTotalInCart();
  }
}
