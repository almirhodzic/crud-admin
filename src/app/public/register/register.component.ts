import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../public.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

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
      password_confirm: '',
    });
  }

  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  passwordConfirmError: string = '';

  submit(): void {  
    this.authService.register(this.form.getRawValue()).subscribe({
      next: (d) =>  { 
        this.router.navigate(['/thankyou']);
      },
      error: (err) => { 
        err = err.error.errors;
      if (err.first_name && err.first_name.length > 0) { const firstNameError = err.first_name[0]; this.firstNameError = firstNameError; };
      if (err.last_name && err.last_name.length > 0) { const lastNameError = err.last_name[0]; this.lastNameError = lastNameError; };
      if (err.email && err.email.length > 0) { const emailError = err.email[0]; this.emailError = emailError; };
      if (err.password && err.password.length > 0) { const passwordError = err.password[0]; this.passwordError = passwordError; };
      if (err.password_confirm && err.password_confirm.length > 0) { const passwordConfirmError = err.password_confirm[0]; this.passwordConfirmError = passwordConfirmError; };
      },
      complete: () => { 
        console.log('complete');
      } 
    });
  }
}
