import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
      remember: ''
    });
  }

  loginErrorMessage: string = '';

  submit(): void {  
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (d) =>  { 
        this.router.navigate(['/']);
      },
      error: (err) => { 
        err = err.error;
        if (err.message) { const loginErrorMessage = err.message[0]; this.loginErrorMessage = loginErrorMessage; };
      },
      complete: () => { } 
    });
  }
}
