import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../classes/auth';
import { User } from '../../../interfaces/user';
import { Role } from '../../../interfaces/role';

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
