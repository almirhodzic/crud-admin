import { Component } from '@angular/core';
import { appInfo } from '../environments/environment.dev';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent {

  appInfo = appInfo;

  constructor() { }

}
