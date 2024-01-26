import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reseted',
  templateUrl: './password-reseted.component.html',
  styleUrls: ['./password-reseted.component.css', '../public.component.css']
})
export class PasswordResetedComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private router : Router
  ) { }

  cookiename = 'pwreseted';
  cookieObject = document.cookie.indexOf(this.cookiename);

  ngOnInit() {
    if(this.cookieObject == -1) {
      this.router.navigate(['/login']);
    }
  }

}
