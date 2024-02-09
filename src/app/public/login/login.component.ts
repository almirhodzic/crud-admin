import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { appInfo } from 'src/app/environments/environment.dev';

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
    private authService: AuthService
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
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (d) =>  { 
        this.router.navigate(['/dashboard']);
      },
      error: (err) => { 
        this.issue = err.error.issue;
        this.loginErrorMessage = err.error.message;
        
        if(!this.issue) {
          this.handleErrors(err.error.errors);
        }
      },
      complete: () => { } 
    });
  }
}
