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
  categorDefault: string = "0";

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoriesService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: '',
      price: '',
      description: '',
      image: '',
      category_id: '',
    });

    this.categoriesService.all().subscribe(
      categories => this.categories = categories,
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
          this.toastr.error('Fehler beim Speichern', '');
        },
        complete: () => { }
      }
    );
  }
}
