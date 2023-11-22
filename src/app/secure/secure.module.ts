import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { TogglerComponent } from '../toggler/toggler.component';
import { NavComponent } from './nav/nav.component';
import { SecureComponent } from './secure.component';

@NgModule({
  declarations: [
    NavComponent,
    TogglerComponent,
    MenuComponent,
    SecureComponent
  ],
  imports: [
    CommonModule
  ],
})
export class SecureModule { }
