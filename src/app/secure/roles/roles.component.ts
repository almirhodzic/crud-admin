import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css', '../secure.component.css']
})

export class RolesComponent implements OnInit {
  roles : Role[] = [];
  
  constructor(
    private roleservice: RoleService,
  ) { }

  ngOnInit(): void {
    this.roleservice.all().subscribe(
      roles => this.roles = roles
    );
  }

  delete(id: number): void {
    if (confirm(`Are you sure you want to delete this (${id}) role?`)) {
      this.roleservice.delete(id).subscribe(
        () => this.roles = this.roles.filter(role => role.id !== id)
      );
    }
  }
}
