import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./../shop.component.css','./product.component.css', './../product/product.component.css', './../../../secure/secure.component.css']
})
export class ProductComponent implements OnInit{

  product: Product[] = [];
  category: Category[] = [];
  catid: number = 0;
  id!: number;

  productid: number = 0;
  productcatid: number = 0;
  productcatname: string = '';
  productcatslug: string = '';
  producttitle: string = '';
  productslug: string = '';
  productshortinfo: string = '';
  productinfo: string = '';
  productImage: string = '';
  productcreated: string = '';
  productupdated: string = '';
  productinstock: number = 0;
  productprice: number = 0;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.loadItem();
    });
  }

  loadItem(): void {
    this.id = this.route.snapshot.params['id'];
    
    if (this.id) {
      this.productService.get(this.id).subscribe(
        product => {
          this.productid = product.id;
          this.productcatid = product.category_id;
          this.productcatname = product.categoryname;
          this.productcatslug = product.categoryslug;
          this.producttitle = product.title;
          this.productslug = product.slug;
          this.productshortinfo = product.shortinfo;
          this.productinfo = product.description;
          this.productImage = product.image;
          this.productcreated = product.created;
          this.productupdated = product.updated;
          this.productinstock = product.instock;
          this.productprice = product.price;
        }
      );
      
    }
  }

  formatPrice(price: number) {
    return this.cartService.formatPrice(price);
  }

  inStock(quantity: any): any {
    return this.cartService.inStock(quantity);
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
  this.cartService.addToCart(
    productId, 
    productName, 
    productPrice,
    productImage,
    inStock,
    productSlug,
    productShortinfo
    );
  }
}