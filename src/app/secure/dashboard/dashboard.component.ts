import { Component } from '@angular/core';
import { appInfo } from '../../environments/environment.dev';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../secure.component.css']
})
export class DashboardComponent {

  appInfo = appInfo;


}
