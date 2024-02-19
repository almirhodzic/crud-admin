import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from '../menu/menu.component';
import { appInfo } from '../../environments/environment.dev';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import { Role } from 'src/app/interfaces/role';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../nav/avatar/avatar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NavComponent implements OnInit {

  appInfo = appInfo;
  user?: User;
  userrole?: Role;
  
  @Output() functionTriggered = new EventEmitter<void>();

  triggerFunction() {
    this.functionTriggered.emit();
  }

  triggerSidebar() {
    this.functionTriggered.emit();
  }
  
  constructor(
    private authService: AuthService,
    public sidebar: MenuComponent,
    private router: Router
  ) {}
  
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
      this.router.navigate(['/login']);
    });
  }
}
