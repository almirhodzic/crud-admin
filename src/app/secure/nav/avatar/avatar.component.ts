import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import { Role } from 'src/app/interfaces/role';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css', '../nav.component.css']
})
export class AvatarComponent implements OnInit{

  user?: User;
  userrole?: Role;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    Auth.userEmitter.subscribe(
      (user: any) => {
        this.user = user;
        this.userrole = user?.role.name;
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      location.reload();
    });
  }
}
