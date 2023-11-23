import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { TogglerComponent } from '../toggler/toggler.component';
import { NavComponent } from './nav/nav.component';
import { SecureComponent } from './secure.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavComponent,
    TogglerComponent,
    MenuComponent,
    SecureComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SecureModule { }
