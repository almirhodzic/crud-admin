import { Component, OnInit, inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
 
  constructor(
  private authService: AuthService, 
  private router: Router)
  {}

  userRoled: number = 1;

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user().pipe(
      map((user: any) => {
        if(user.role.id === 1) {
          return true;
        } else {
          this.router.navigate(['/restricted']);
          return false;
        }
      }),
      catchError((error) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}