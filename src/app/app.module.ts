import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecureModule } from './secure/secure.module';
import { PublicModule } from './public/public.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CredentialInterceptor } from './interceptors/credential.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SecureModule,
    PublicModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
