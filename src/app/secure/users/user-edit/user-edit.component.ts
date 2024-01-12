import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../../../interfaces/role';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css', '../../secure.component.css']
})
export class UserEditComponent implements OnInit {

  form!: FormGroup;
  roles: Role[] = [];
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private roleservice: RoleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.id = this.route.snapshot.params['id'];

    this.userService.get(this.id).subscribe(
      user => this.form.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        address: user.address,
        country: user.country,
        city: user.city,
        zipcode: user.zipcode,
        role_id: user.role.id,
      })
    );
  }
}
