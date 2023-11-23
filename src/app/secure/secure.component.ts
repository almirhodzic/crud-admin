import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'; 
import { of } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  user! : User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() :void {
      this.authService.user()
      .subscribe(
        {
          next: user => this.user = user,
          error: () => this.router.navigate(['/login']),
          complete: () => console.log('Logged in as ' + this.user.first_name)
        }
      );
    }
}
