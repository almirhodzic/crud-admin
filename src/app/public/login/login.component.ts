import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.dev';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../public.component.css']
})
export class LoginComponent implements OnInit {

  email?: string = 'a@a.com';
  password?: string = 'ok';
  remember?: boolean = false; 

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
      remember: ''
    });
  }

  submit(): void {  
    this.http.post(`${environment.api}/login`, this.form.getRawValue(), { withCredentials: true })
      .subscribe(res => {
        this.router.navigate(['/']);
      });
  }
}
