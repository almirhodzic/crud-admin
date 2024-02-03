import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css', '../public.component.css']
})
export class PasswordForgotComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordService: PasswordService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: '',
    });
  }

  requestMessage: string = '';
  message: string = '';

  submit(): void {
    this.passwordService.requestPassreset(this.form.getRawValue().email).subscribe({
      next: (response) => {
        const message = response.message;
        if (message) {
          this.requestMessage = message;
        }
      },
      error: (err) => {},
      complete: () => {}
    });
  }


  resendLink(): void {
    this.requestMessage = '';
    this.form.reset();
  }

}
