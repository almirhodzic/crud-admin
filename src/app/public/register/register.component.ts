import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.dev';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../public.component.css']
})
export class RegisterComponent implements OnInit {

  first_name?: '';
  last_name?: '';
  email?: 'a@a.com';
  password?: '';
  password_confirm?: '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

  }

  submit(): void {
    this.http.post(`${environment.api}/register`, {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm
    }).subscribe(() => this.router.navigate(['/login']));
  }
}
