import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/interfaces/role';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css', '../../secure.component.css']
})
export class UserEditComponent implements OnInit {

  form!: FormGroup;
  roles: Role[] = [];
  id: number = 0;
  emailchecked: string = 'E-Mail-Adresse nicht bestätigt';
  emailcheckedIcon: string = 'bi-question-circle icon-symbol icon-red';
  useremail: string = '';
  countryDefault = 'CH';
  errorBlock: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private roleservice: RoleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  f1E: string = '';
  f2E: string = '';
  f5E: string = '';
  f6E: string = '';
  f8E: string = '';
  f9E: string = '';

  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.first_name && errors.first_name.length > 0) { this.f1E = errors.first_name[0]; }
    if (errors.last_name && errors.last_name.length > 0) { this.f2E = errors.last_name[0]; }
    if (errors.phone && errors.phone.length > 0) { this.f5E = errors.phone[0]; }
    if (errors.address && errors.address.length > 0) { this.f6E = errors.address[0]; }
    if (errors.zipcode && errors.zipcode.length > 0) { this.f8E = errors.zipcode[0]; }
    if (errors.city && errors.city.length > 0) { this.f9E = errors.city[0]; }
  }

  clearErrorFields() {
    this.f1E = '';
    this.f2E = '';
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

    this.id = this.route.snapshot.params['id'];

    this.userService.get(this.id).subscribe(
      user => 
      {
        if(user.email_verified_at) {
          this.emailchecked = 'E-Mail-Adresse bestätigt';
          this.emailcheckedIcon = 'bi-check2-circle icon-symbol icon-green';
        }
        this.useremail = user.email;
        this.form.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          address: user.address,
          country: user.country ? user.country : 'CH',
          city: user.city,
          zipcode: user.zipcode,
          role_id: user.role.id,
        })
      },
    );
  }

  submit(): void {
    this.userService.update(this.id, this.form.getRawValue()).subscribe(
      {
        next: (d) =>  { 
          this.router.navigate(['/users']),
          this.toastr.success('Benutzerdaten gespeichert!', '')
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
