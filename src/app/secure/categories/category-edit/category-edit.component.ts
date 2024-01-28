import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css', '../../secure.component.css']
})
export class CategoryEditComponent implements OnInit {

  form!: FormGroup;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      order: '',
    });

    this.id = this.route.snapshot.params['id'];

    this.categoryService.get(this.id).subscribe(
      category => this.form.patchValue({
        name: category.name,
        order: category.order,
      }),
    );
  }

  submit() {
    this.categoryService.update(this.id, this.form.getRawValue()).subscribe(
      {
        next: (d) =>  { 
          this.router.navigate(['/categories']),
          this.toastr.success('Kategorie gespeichert!', '');
        },
        error: (err) => { 
          this.toastr.error('Fehler beim Speichern', '');
        },
        complete: () => { }
      }
    );
  }
}
