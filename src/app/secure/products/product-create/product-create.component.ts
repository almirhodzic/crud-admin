import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css', '../../secure.component.css']
})
export class ProductCreateComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];
  categoryDefault: string = "0";

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  f1E: string = '';
  f2E: string = '';
  f3E: string = '';
  f4E: string = '';
  f5E: string = '';
  f6E: string = '';

  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.category_id && errors.category_id.length > 0) { this.f1E = errors.category_id[0]; }
    if (errors.title && errors.title.length > 0) { this.f2E = errors.title[0]; }
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
  }
  

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: '',
      price: '',
      description: '',
      image: '',
      category_id: '',
      instock: 10
    });

    this.categoryService.all().subscribe(
      res => {
        this.categories = res.data;
      }
    );
  }

  submit() {
    this.productService.create(this.form.getRawValue()).subscribe(
      {
        next: (d) =>  { 
          this.router.navigate(['/products']),
          this.toastr.success('Neues Produkt aufgenommen!', '');
        },
        error: (err) => { 
          this.handleErrors(err.error.errors);
        },
        complete: () => { }
      }
    );
  }
}
