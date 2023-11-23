import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input('user') user?: User;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      location.reload();
    });
  }
}
