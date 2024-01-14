import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Permission } from '../../../interfaces/permission';
import { PermissionService } from '../../../services/permission.service';
import { FormArray } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/interfaces/role';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css', '../../secure.component.css']
})
export class RoleEditComponent {
  form!: FormGroup;
  permissions!: Permission[];
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([])
    });

    this.permissionService.all().subscribe(
      permissions => {
        this.permissions = permissions;

        this.permissions.forEach(p => {
          this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          );
        });
      }
    );

    this.id = this.route.snapshot.params['id'];

    this.roleService.get(this.id).subscribe(
      (role: Role ) => {
        const values = this.permissions.map(
          p => {
            return {
              value: role.permissions?.some(r => r.id === p.id),
              id:  p.id
            };
          }
        );

        this.form.patchValue({
          name: role.name,
          permissions: values
        });
      }
    );
  }

  submit(): void {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter((p: any) => p.value === true).map((p: any) => p.id)
      };

      this.roleService.update(this.id, data).subscribe(
        () => this.router.navigate(['/roles'])
      );
    }

}
