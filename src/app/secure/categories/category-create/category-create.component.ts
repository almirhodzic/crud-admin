import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css', '../../secure.component.css']
})
export class CategoryCreateComponent implements OnInit { 

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  f1E: string = '';

  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.name && errors.name.length > 0) { this.f1E = errors.name[0]; }
  }

  clearErrorFields() {
    this.f1E = '';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      order: '',
    });
  }

  submit() {
    this.categoryService.create(this.form.getRawValue()).subscribe(
      {
        next: (d) =>  { 
          this.router.navigate(['/categories']),
          this.toastr.success('Neue Kategorie aufgenommen!', '');
        },
        error: (err) => { 
          this.handleErrors(err.error.errors);
        },
        complete: () => { }
      }
    );
  }
}
