import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment.dev';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../public.component.css']
})
export class RegisterComponent implements OnInit {

  first_name?: '';
  last_name?: '';
  email?: '';
  password?: '';
  password_confirm?: '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  submit(): void {
    this.authService.register({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm
    }).subscribe(() => this.router.navigate(['/login']));
  }
}
