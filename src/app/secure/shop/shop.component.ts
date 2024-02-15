import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

interface CartProduct {
  productId: number;
  productName: string;
  productPrice: string;
  quantity: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css', '../secure.component.css']
})
export class ShopComponent implements OnInit{
  
    products: Product[] = [];
    page = 1;
    lastPage!: number;
    totalProducts!: number;
    productimage: string = '';
    count: number = 1;
    stockIconColor: string = 'white';
    totalQuantity: number | undefined = 0;
    
    constructor(
      private productService: ProductService,
      private toastr: ToastrService,
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
          this.totalProducts = res.meta.total;
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

    addToCart(productId: number, productName: string, productPrice: number, inStock: number): void {
      // Versuchen Sie, das bestehende Warenkorb-Array aus dem localStorage zu lesen
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
      // Finden Sie das Produkt im Warenkorb, falls vorhanden
      const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
    
      if (existingProductIndex !== -1) {
        // Wenn das Produkt bereits existiert, erhöhen Sie nur die Menge
        cart[existingProductIndex].quantity += 1;
      } else {
        // Wenn das Produkt neu ist, fügen Sie es dem Warenkorb hinzu
        cart.push({ productId, productName, productPrice, quantity: 1 });
      }
      // Speichern Sie das aktualisierte Warenkorb-Array zurück in den localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      this.displayCartItems();
    }


    displayCartItems() {
      const cartItemsElement = document.getElementById('cartItems');

      while (cartItemsElement!.firstChild) {
        cartItemsElement!.removeChild(cartItemsElement!.firstChild);
      }

      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
      // Für jedes Produkt im Warenkorb ein Listenelement erstellen
      cart.forEach((product: CartProduct) => {
        const li = document.createElement('li');

        li.textContent = `ID: ${product.productId} - ${product.productName} - €${product.productPrice} - Quantity: ${product.quantity}`;

        cartItemsElement!.appendChild(li);
      });

      const totalQuantity = cart.reduce((total:any, product:any) => {
        return total + product.quantity;
      }, 0);

      this.totalQuantity = totalQuantity;
    }

    getTotalinCart() {
      const cartString = localStorage.getItem('cart');
      const cart = cartString ? JSON.parse(cartString) : [];
      const totalinCart = cart.reduce((total:number, product:any) => total + product.quantity, 0);
      return totalinCart;
    }

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
