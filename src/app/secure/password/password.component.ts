import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { appSecurity } from '../../environments/environment';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css', './../secure.component.css']
})
export class PasswordComponent implements OnInit {

  form!: FormGroup;
  p1E: string = '';
  minPasswordLenght = appSecurity.minPasswordLenght;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: '',
    });
  }

  submit(): void {
    this.authService.updatePassword(this.form.getRawValue())
    .subscribe(
      {
        next: res => {
          this.p1E = '';
          this.toastr.success('Passwort geändert!', '');
          this.form.reset();
        },
        error: err => { 
          this.p1E = '';
          err = err.error.errors;
          if (err.password && err.password.length > 0) { const p1E = err.password[0]; this.p1E = p1E; };
        },
        complete: () => { }
      }
    );
  }

}
