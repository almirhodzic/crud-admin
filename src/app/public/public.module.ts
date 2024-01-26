import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { PasswordSetComponent } from './password-set/password-set.component';
import { PasswordResetedComponent } from './password-reseted/password-reseted.component';

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent,
    ThankyouComponent,
    ConfirmedComponent,
    VerifyAccountComponent,
    PasswordForgotComponent,
    PasswordSetComponent,
    PasswordResetedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
