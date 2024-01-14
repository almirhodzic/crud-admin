import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css', '../../secure.component.css']
})
export class ProductCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [''],
      price: [''],
      description: [''],
      image: [''],
    });
  }
  submit() {
    this.productService.create(this.form.getRawValue()).subscribe(
      () => {
      this.router.navigate(['/products']);
    });
  }
}
