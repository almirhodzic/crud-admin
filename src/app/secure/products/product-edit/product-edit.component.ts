import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css', '../../secure.component.css']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [''],
      price: [''],
      description: [''],
      image: [''],
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.productService.get(this.id).subscribe(
        product => {
          this.form.patchValue(product);
        }
      );
    }
  }


  submit() {
    this.productService.update(this.id, this.form.getRawValue()).subscribe(
      () => {
      this.router.navigate(['/products']);
    });
  }

}
