import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

export const CanActivate = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isRole() === 1){
        return true;
    }else{
        router.navigate(['/restricted']);
        return false;
    }
}

export const CanActivateChild = () => {
    return CanActivate();
}