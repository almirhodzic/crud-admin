import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Auth } from '../classes/auth';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() :void {
    this.authService.user()
    .pipe(
      catchError(err => {
        this.router.navigate(['/login']);
        return of(err);
      })
    ).subscribe(user => Auth.userEmitter.next(user));
}}