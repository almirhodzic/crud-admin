import { Component, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css', '../secure.component.css']
})
export class ShopComponent implements OnInit{
  
    products: Product[] = [];
    page = 1;
    lastPage!: number;
    productimage: string = '';
    count: number = 1;
    stockIconColor: string = 'white';
    totalQuantity: number | undefined = 0;

    constructor(
      private productService: ProductService,
      private toastr: ToastrService,
      private cartService: CartService
    ) { }
  
    ngOnInit(): void {
      this.load();
      this.displayCartItems();
    }
  
    load(): void {
      this.productService.all(this.page).subscribe(
        res => {
          this.products = res.data;
          this.lastPage = res.meta.last_page;
        }
      );
    }

    inStock(quantity: number): any {
      if(quantity > 4) {
        return 'bi-check-circle-fill stockgreen';
      } else if(quantity > 0) {
        return 'bi-exclamation-circle-fill stockorange';
      } else {
        return 'bi-x-circle-fill stockgrey';
      }
    }

    addToCart(
      productId: number, 
      productName: string, 
      productPrice: number, 
      inStock: number): void {
      this.cartService.addToCart(productId, productName, productPrice, inStock);
    }


    displayCartItems() {
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
    }

    /* getTotalinCart() {
      const cartString = localStorage.getItem('cart');
      const cart = cartString ? JSON.parse(cartString) : [];
      const totalinCart = cart.reduce((total:number, product:any) => total + product.quantity, 0);
      return totalinCart;
    } */

    /* calculateTotalQuantity() {
      // Warenkorb aus dem localStorage lesen und in ein Array umwandeln
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
      // Gesamtsumme der Produktmengen berechnen
      const totalQuantity = cart.reduce((total:any, product:any) => {
        return total + product.quantity;
      }, 0); // Starten Sie den Gesamtwert mit 0
    
      return totalQuantity;
    } */
  
    next(): void {
      if(this.page === this.lastPage) { return; }
      this.page++;
      this.load();
    }
    
    previous(): void {
      if(this.page === 1) { return; }
      this.page--;
      this.load();
    }
  
    delete(id: number): void {
      if(confirm(`Are you sure you want to delete this (${id}) product ?`)) {
        this.productService.delete(id).subscribe(
          {
            next: (d) =>  { 
              this.products = this.products.filter(p => p.id !== id);
              this.toastr.success('Product deleted!', '');
              this.load();
            },
            error: (err) => {},
          }
        );
      }
    }
}
