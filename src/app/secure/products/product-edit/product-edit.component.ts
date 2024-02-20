import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css', '../../secure.component.css']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  categories: Category[] = [];
  productid: number = 0;
  producttitle: string = '';
  productImage: string = '';
  productcreated: string = '';
  productupdated: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cartService: CartService
  ) { }

  f1E: string = '';
  f2E: string = '';
  f3E: string = '';
  f4E: string = '';
  f5E: string = '';
  f6E: string = '';
  f7E: string = '';

  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.category_id && errors.category_id.length > 0) { this.f1E = errors.category_id[0]; }
    if (errors.title && errors.title.length > 0) { this.f2E = errors.title[0]; }
    if (errors.shortinfo && errors.shortinfo.length > 0) { this.f7E = errors.shortinfo[0]; }
    if (errors.description && errors.description.length > 0) { this.f3E = errors.description[0]; }
    if (errors.price && errors.price.length > 0) { this.f4E = errors.price[0]; }
    if (errors.image && errors.image.length > 0) { this.f5E = errors.image[0]; }
    if (errors.instock && errors.instock.length > 0) { this.f6E = errors.instock[0]; }
  }

  clearErrorFields() {
    this.f1E = '';
    this.f2E = '';
    this.f3E = '';
    this.f4E = '';
    this.f5E = '';
    this.f6E = '';
    this.f7E = '';
  }

    formatDate(givenString: string ): string {
      return new Date(givenString).toLocaleString('de-DE')
    }
    ngOnInit() {
    this.form = this.formBuilder.group({
      title: '',
      shortinfo: '',
      price: '',
      description: '',
      image: '',
      category_id: '',
      instock: ''
    });

    this.categoryService.all().subscribe(
      res => {
        this.categories = res.data;
      }
    );

    this.id = this.route.snapshot.params['id'];
    
    if (this.id) {
      this.productService.get(this.id).subscribe(
        product => {
          this.form.patchValue(product);
          this.productid = product.id;
          this.producttitle = product.title;
          this.productImage = product.image;
          this.productcreated = this.formatDate(product.created);
          this.productupdated = this.formatDate(product.updated);
        }
      );
    }
  }

  updateCartItemValue(productId: number, title: string, price: number, image: string, inStock: number) {
    this.cartService.updateCartItemValue(productId, title, price, image, inStock);
  }

  submit() {
    this.productService.update(this.id, this.form.getRawValue()).subscribe(
      {
        next: (d) =>  { 
          this.router.navigate(['/products']),
          this.toastr.success('Produkt gespeichert!', '');
          this.updateCartItemValue(this.productid, this.form.value.title, this.form.value.price, this.form.value.image, this.form.value.instock);
        },
        error: (err) => { 
          this.handleErrors(err.error.errors);
        },
        complete: () => { }
      }
    );
  }
}
