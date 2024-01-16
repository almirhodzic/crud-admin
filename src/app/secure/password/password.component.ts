import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css', './../secure.component.css']
})
export class PasswordComponent implements OnInit {

  passwordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: [''],
      password_confirm: ['']
    });
  }

  passwordSubmit(): void {
    this.authService.updatePassword(this.passwordForm.getRawValue())
    .subscribe(
      res =>{ 
        console.log('Password updated successfully') 
        this.toastr.success('Passwort geändert!', '')
      },
      err => {
        this.toastr.error('Fehler beim Speichern', '');
      }

      );
  }

}
