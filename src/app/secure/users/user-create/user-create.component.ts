import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../../../interfaces/role';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css', '../../secure.component.css']
})
export class UserCreateComponent implements OnInit {

  form!: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleservice: RoleService,
    private userService: UserService,
    private router: Router
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
      city: '',
      zipcode: '',
      role_id: '',
    });

    this.roleservice.all().subscribe(
      roles => this.roles = roles,
    );
  }

  submitNewUser(): void {
    this.userService.create(this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/users']),
    );
  }

}
