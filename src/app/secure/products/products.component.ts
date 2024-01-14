import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../secure.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.all().subscribe(
      products => {
        this.products = products;
    });
  }
}
