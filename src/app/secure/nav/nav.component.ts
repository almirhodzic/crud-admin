import { Component, Injectable, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  status: boolean = false;

  constructor(
    private authService: AuthService,
    public sidebar: MenuComponent,
  ) {}
  
  ngOnInit() {

  }
}
