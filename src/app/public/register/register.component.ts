import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { appSecurity } from '../../environments/environment';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../public.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  minPasswordLenght = appSecurity.minPasswordLenght;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    });
  }

  f1E: string = '';
  f2E: string = '';
  f3E: string = '';
  p1E: string = '';

  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.first_name && errors.first_name.length > 0) { this.f1E = errors.first_name[0]; }
    if (errors.last_name && errors.last_name.length > 0) { this.f2E = errors.last_name[0]; }
    if (errors.email && errors.email.length > 0) { this.f3E = errors.email[0]; }
    if (errors.password && errors.password.length > 0) { this.p1E = errors.password[0]; }
  }
  
  clearErrorFields() {
    this.f1E = '';
    this.f2E = '';
    this.f3E = '';
    this.p1E = '';
  }

  submit(): void {  
    this.loaderService.setLoading(true);
    this.authService.register(this.form.getRawValue()).subscribe({
      next: (d) =>  {
        this.loaderService.setLoading(false);
        this.router.navigate(['/thankyou']);
      },
      error: (err) => { 
        this.handleErrors(err.error.errors);
      },
      complete: () => { 
      } 
    });
  }
}
