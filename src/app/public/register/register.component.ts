import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { appSecurity } from '../../environments/environment';

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
    private authService: AuthService
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

  submit(): void {  
    this.authService.register(this.form.getRawValue()).subscribe({
      next: (d) =>  { 
        this.router.navigate(['/thankyou']);
      },
      error: (err) => { 
      err = err.error.errors;
      if (err.first_name && err.first_name.length > 0) { const f1E = err.first_name[0]; this.f1E = f1E; };
      if (err.last_name && err.last_name.length > 0) { const f2E = err.last_name[0]; this.f2E = f2E; };
      if (err.email && err.email.length > 0) { const f3E = err.email[0]; this.f3E = f3E; };
      if (err.password && err.password.length > 0) { const p1E = err.password[0]; this.p1E = p1E; };
      },
      complete: () => { 
        console.log('');
      } 
    });
  }
}
