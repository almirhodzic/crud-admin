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
  emailchecked: string = 'E-Mail-Adresse nicht bestätigt';
  emailcheckedIcon: string = 'bi-question-circle icon-symbol icon-red';
  useremail: string = '';
  errorBlock: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  f1E: string = '';
  f2E: string = '';
  f5E: string = '';
  f6E: string = '';
  f8E: string = '';
  f9E: string = '';

  clearErrorFields() {
    this.f1E = '';
    this.f2E = '';
    this.f5E = '';
    this.f6E = '';
    this.f8E = '';
    this.f9E = '';
    this.errorBlock = false;
  }
  
  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.first_name && errors.first_name.length > 0) { this.f1E = errors.first_name[0]; }
    if (errors.last_name && errors.last_name.length > 0) { this.f2E = errors.last_name[0]; }
    if (errors.phone && errors.phone.length > 0) { this.f5E = errors.phone[0]; }
    if (errors.address && errors.address.length > 0) { this.f6E = errors.address[0]; }
    if (errors.zipcode && errors.zipcode.length > 0) { this.f8E = errors.zipcode[0]; }
    if (errors.city && errors.city.length > 0) { this.f9E = errors.city[0]; }
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      phone: '',
      address: '',
      country: '',
      zipcode: '',
      city: '',
    });

    Auth.userEmitter.subscribe(
      user => {
        if(user) {
          if(user.email_verified_at) {
            this.emailchecked = 'E-Mail-Adresse bestätigt';
            this.emailcheckedIcon = 'bi-check2-circle icon-symbol icon-green';
          }
          this.form.patchValue({
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            address: user.address,
            country: user.country ? user.country : 'CH',
            city: user.city,
            zipcode: user.zipcode,
          });
          this.useremail = user.email;
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
          this.clearErrorFields();
          Auth.userEmitter.next(user),
          this.toastr.success('Benutzerdaten gespeichert!', '');
        },
        error: err => { 
          this.handleErrors(err.error.errors);
          this.errorBlock = err.error.errors;
        },
        complete: () => { }
      }
    );
  }
}
