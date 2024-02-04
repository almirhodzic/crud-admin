import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from '../menu/menu.component';
import { appInfo } from '../../environments/environment.dev';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  appInfo = appInfo;
  
  @Output() functionTriggered = new EventEmitter<void>();

  triggerFunction() {
    this.functionTriggered.emit();
  }

  triggerSidebar() {
    this.functionTriggered.emit();
  }
  
  constructor(
    private authService: AuthService,
    public sidebar: MenuComponent,
  ) {}
  
  ngOnInit() {

  }
}
