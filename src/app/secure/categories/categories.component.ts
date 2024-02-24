import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../secure.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  page = 1;
  lastPage!: number;
  totalCategories!: number;
  
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.categoryService.all(this.page).subscribe(
      res => {
        this.categories = res.data;
        this.lastPage = res.meta.last_page;
        this.totalCategories = res.meta.total;
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
    if(confirm(`Willst Du diese Kategorie (Id: ${id}) wirkllich löschen?`)) {
      this.categoryService.delete(id).subscribe(
        {
          next: (d) =>  { 
            this.categories = this.categories.filter(c => c.id !== id);
            this.toastr.success('Category deleted!', '');
            this.load();
          },
          error: (err) => {},
          complete: () => {}
        }
      );
    }
  }
}
