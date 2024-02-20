import { Component, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
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
    }
  
    load(): void {
      this.productService.all(this.page).subscribe(
        res => {
          this.products = res.data;
          this.lastPage = res.meta.last_page;
        }
      );
    }

    inStock(quantity: any): any {
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
        productImage: string,
        inStock: number,
        productSlug: string
        ): void {
      this.cartService.addToCart(
        productId, 
        productName, 
        productPrice,
        productImage,
        inStock,
        productSlug
        );
    }

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
