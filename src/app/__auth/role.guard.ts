import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const currentUserRole = this.authService.getUserRole();

    if (currentUserRole && currentUserRole === 1) {
      // Wenn die Rolle des Benutzers 4 ist, Zugriff verweigern
      this.router.navigate(['/unauthorized']); // Umleitung, wenn der Benutzer nicht autorisiert ist
      return false;
    }
    return true; // Zugriff erlauben, wenn die Rolle nicht 4 ist
  }
}