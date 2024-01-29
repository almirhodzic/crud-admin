import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css', '../../secure.component.css']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  productid: number = 0;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoriesService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.productService.get(this.id).subscribe(
        product => {
          this.form.patchValue(product);
          this.productid = product.id;
        }
      );
    }
  }

  submit() {
    this.productService.update(this.id, this.form.getRawValue()).subscribe(
      {
        next: (d) =>  { 
          this.router.navigate(['/products']),
          this.toastr.success('Produkt gespeichert!', '');
        },
        error: (err) => { 
          this.toastr.error('Fehler beim Speichern', '');
        },
        complete: () => { }
      }
    );
  }
}
