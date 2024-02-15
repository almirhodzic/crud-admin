import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../secure.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  catid: number = 0;
  page = 1;
  lastPage!: number;
  totalProducts!: number;
  productimage: string = '';
  count: number = 1;
  
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.load();
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
          complete: () => {}
        }
      );
    }
  }
}
