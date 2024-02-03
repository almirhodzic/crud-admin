import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../../../interfaces/role';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUserService } from '../../../services/createuser.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css', '../../secure.component.css']
})
export class UserCreateComponent implements OnInit {
  roleDefault = 4; // 1=Admin, 2=Editor, 3=Viewer, 4=Client
  form!: FormGroup;
  roles: Role[] = [];
  countryDefault = 'CH';
  errorBlock: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private roleservice: RoleService,
    private createUserService: CreateUserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  f1E: string = '';
  f2E: string = '';
  f4E: string = '';
  f5E: string = '';
  f6E: string = '';
  f8E: string = '';
  f9E: string = '';

  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.first_name && errors.first_name.length > 0) { this.f1E = errors.first_name[0]; }
    if (errors.last_name && errors.last_name.length > 0) { this.f2E = errors.last_name[0]; }
    if (errors.email && errors.email.length > 0) { this.f4E = errors.email[0]; }
    if (errors.phone && errors.phone.length > 0) { this.f5E = errors.phone[0]; }
    if (errors.address && errors.address.length > 0) { this.f6E = errors.address[0]; }
    if (errors.zipcode && errors.zipcode.length > 0) { this.f8E = errors.zipcode[0]; }
    if (errors.city && errors.city.length > 0) { this.f9E = errors.city[0]; }
  }

  clearErrorFields() {
    this.f1E = '';
    this.f2E = '';
    this.f4E = '';
    this.f5E = '';
    this.f6E = '';
    this.f8E = '';
    this.f9E = '';
    this.errorBlock = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      city: '',
      zipcode: '',
      role_id: '',
    });

    this.roleservice.all().subscribe(
      roles => this.roles = roles,
    );
  }

  submit(): void {
    this.createUserService.create(this.form.getRawValue()).subscribe(
      {
        next: (d) =>  { 
          this.router.navigate(['/users']),
          this.toastr.success('Benutzer erstellt!', '')
        },
        error: (err) => { 
          this.handleErrors(err.error.errors);
          this.errorBlock = err.error.errors;
        },
        complete: () => { }
      }
    );
  }

}