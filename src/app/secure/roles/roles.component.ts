import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css', '../secure.component.css']
})

export class RolesComponent implements OnInit {
  roles : Role[] = [];
  
  constructor(
    private roleservice: RoleService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.roleservice.all().subscribe(
      roles => this.roles = roles
    );
  }

  delete(id: number): void {
    if (confirm(`Are you sure you want to delete this (${id}) role?`)) {
      this.roleservice.delete(id).subscribe(
        () => { 
          this.roles = this.roles.filter(role => role.id !== id),
          this.toastr.success('Rolle gelöscht!', '')
        },
        (error) => this.toastr.error('Fehler beim Löschen', '')
      );
    }
  }
}
