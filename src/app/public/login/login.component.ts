import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { appInfo } from 'src/app/environments/environment.dev';
import { LoaderService } from 'src/app/services/loader.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../public.component.css']
})
export class LoginComponent implements OnInit {

form!: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private authService: AuthService,
  private loaderService: LoaderService,
  private cartService: CartService
) {}

f1E: string = '';
f2P: string = '';
issue: boolean = false;
loginErrorMessage: string = '';
applicationName: string = appInfo.appName;

handleErrors(errors: any) {
  this.clearErrorFields();
  if (errors.email && errors.email.length > 0) { this.f1E = errors.email[0]; }
  if (errors.password && errors.password.length > 0) { this.f2P = errors.password[0]; }
}

clearErrorFields() {
  this.f1E = '';
  this.f2P = '';
}

ngOnInit(): void {
  this.form = this.formBuilder.group({
    email: '',
    password: ''
  });
}

submit(): void {  
  this.loaderService.setLoading(true);
    setTimeout(() => {
      this.authService.login(this.form.getRawValue()).subscribe({
        next: (d) =>  { 
          this.cartService.clearCartSilent();
          this.loaderService.setLoading(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => { 
          this.loaderService.setLoading(false);
          this.issue = err.error.issue;
          this.loginErrorMessage = err.error.message;
          
          if(!this.issue) {
            this.handleErrors(err.error.errors);
          }
        },
        complete: () => { } 
      });
    }, 1000);
  }
}
