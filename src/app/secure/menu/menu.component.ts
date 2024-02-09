import { Component, OnInit, Input, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Auth } from './../../classes/auth';
import { ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user?: User;
  userrole: number = 0;

  sidebarLeft = ''; // Anfangszustand
  sidebarOpened = false;

  reactToEvent() {
    this.sidebarOpened = !this.sidebarOpened;
    this.sidebarLeft = this.sidebarOpened ? '0px' : '-300px';
  }

  closeSidebar() {
    this.sidebarLeft = '-300px'; // Anfangszustand
    this.sidebarOpened = false;
  }

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      (user: any) => {
        this.user = user;
        this.userrole = user?.role.id;
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      location.reload();
    });
  }
}
