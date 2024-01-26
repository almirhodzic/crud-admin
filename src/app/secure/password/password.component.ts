import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css', './../secure.component.css']
})
export class PasswordComponent implements OnInit {

  form!: FormGroup;
  fE1: string = '';
  fE2: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: '',
      password_confirm: ''
    });
  }

  submit(): void {
    this.authService.updatePassword(this.form.getRawValue())
    .subscribe(
      {
        next: res => {
          this.fE1 = ''; this.fE2 = '';
          this.toastr.success('Passwort geändert!', '');
          this.form.reset();
        },
        error: err => { 
          this.fE1 = ''; this.fE2 = '';
          err = err.error.errors;
          if (err.password && err.password.length > 0) { const fE1 = err.password[0]; this.fE1 = fE1; };
          if (err.password_confirm && err.password_confirm.length > 0) { const fE2 = err.password_confirm[0]; this.fE2 = fE2; };
        },
        complete: () => { }
      }
    );
  }

}
