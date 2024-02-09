import { inject, Injectable } from "@angular/core";
import { CanActivateChild, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChild implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.routeConfig?.path === '' || this.authService.isRole() === 1){
      return true;
    }else{
        this.router.navigate(['/restricted']);
        return false;
    }
  }
}

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isRole() === 1){
    return true;
  }else{
      router.navigate(['/restricted']);
      return false;
  }
};