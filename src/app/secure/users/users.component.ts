import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../secure.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  page = 1;
  lastPage!: number;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userService.all(this.page).subscribe(
      (res: any) => {
        this.users = res.data;
      }
    );
  }

  load(): void {
    this.userService.all(this.page).subscribe(
      (res: any) => {
        this.users = res.data;
        this.lastPage = res.meta.last_page;
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
    if(confirm(`Are you sure you want to delete this (${id}) user ?`)) {
      this.userService.delete(id).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== id),
          this.load(),
          this.toastr.success('Benutezr gelöscht!', '')
        },
        (error) => this.toastr.error('Fehler beim Löschen', '')
      );
    }
  }

  editUser(id: number): void {

    alert(id);
      /* this.userService.delete(id).subscribe(
        () => {
          this.users = this.users.filter(u => u.id !== id);
        }
      ); */

  }
}
