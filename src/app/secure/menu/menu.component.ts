import { Component, OnInit, Input, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Auth } from './../../classes/auth';

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
  status: boolean = false;

  public visible() {
   this.status = !this.status;
    //return alert('alerto');
  }

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      user => this.user = user
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      location.reload();
    });
  }
}
