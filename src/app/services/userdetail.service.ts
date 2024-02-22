import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Auth } from './../classes/auth';

@Injectable({
  providedIn: 'root'
})
export class UserdetailService{

  constructor(
    private authService: AuthService,
  ) { }

  private userid: number = 0;
  private userrole: number = 2;

  ngOnInit(): void {
  Auth.userEmitter.subscribe(
      (user: any) => {
        this.userrole = user.role.id
      }
    ); 
  }  

  getUserRole(){
    return this.userrole;
  }

  countrByName(country: string) {
    switch(country) {
      case 'CH': country = 'Schweiz'; break;
      case 'DE': country = 'Deutschland'; break;
      case 'AT': country = 'Österreich'; break;
    }
    return country;
  } 
}
