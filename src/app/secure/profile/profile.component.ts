import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Auth } from './../../classes/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../secure.component.css']
})
export class ProfileComponent implements OnInit {

  form!: FormGroup;
  userid: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      birthday: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      zipcode: '',
      city: '',
      role: '',
    });

    Auth.userEmitter.subscribe(
      user => {
        if(user) {
          this.form.patchValue(user);
          this.userid = user.id;
        }
      }
    );
  }

  submit(): void {
    this.authService.updateProfile(this.form.getRawValue())
    .subscribe(
      {
        next: user => { 
          Auth.userEmitter.next(user),
          this.toastr.success('Benutzerdaten gespeichert!', '');
        },
        error: err => { 
          this.toastr.error('Fehler beim Speichern', '');
        },
        complete: () => { }
      }
    );
  }
}
