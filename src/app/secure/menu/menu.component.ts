import { Component, OnInit, OnDestroy, Input, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Auth } from './../../classes/auth';
import { ChangeDetectorRef } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ViewEncapsulation } from '@angular/core';
import { SidebarToggleService } from 'src/app/services/sidebartoggle.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  user!: User;
  userrole: number = 0;
  localStoraeInfo: any;


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

  localStorageInfo() {
    return this.localStoraeInfo = this.localstorageService.sizeOfLocalStorage();
  }

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    public localstorageService: LocalstorageService,
    public sidebarToggleService: SidebarToggleService
  ) { }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      (user: any) => {
        this.user = user;
        this.userrole = user?.role.id;
      }
    );
    this.localStorageInfo()
  }
}
