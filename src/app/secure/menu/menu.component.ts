import { Component, OnInit, Input, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Auth } from './../../classes/auth';
import { ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared.service';

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
  status: boolean = true;
  clicked = false;

  public visible() {
   this.status = !this.status;
   this.cdRef.detectChanges();
   return alert(this.status);
  }

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      user => this.user = user
    );

    this.sharedService.clickEvent$.subscribe(() => {
      this.status = !this.status;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      location.reload();
    });
  }
}
