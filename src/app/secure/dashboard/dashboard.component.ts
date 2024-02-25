import { Component, OnInit} from '@angular/core';
import { appInfo } from '../../environments/environment.dev';
import { AuthService } from './../../services/auth.service';
import { Auth } from './../../classes/auth';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../secure.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit{

  userid: number = 0;
  useremail: string = '';
  username: string = 'Admin';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    Auth.userEmitter.subscribe(
      user => {
        if(user) {
          this.username = user.first_name;
          this.useremail = user.email;
          this.userid = user.id;
        }
      }
    );
  }

  appInfo = appInfo;
}
