import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  status: boolean = false;
  @Output() customEvent: EventEmitter<any> = new EventEmitter();

  triggerEvent() {
    this.customEvent.emit();
  }
  
  constructor(
    private authService: AuthService,
    public sidebar: MenuComponent,
  ) {}
  
  ngOnInit() {

  }
}
