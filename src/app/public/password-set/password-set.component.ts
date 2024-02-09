import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PasswordService } from './../../services/password.service';
import { appSecurity } from 'src/app/environments/environment';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.css', '../public.component.css']
})
export class PasswordSetComponent implements OnInit {

  token!: string;
  minPasswordLenght = appSecurity.minPasswordLenght;
  form! : FormGroup;
  p1E: string = '';
  formVisible: boolean = true;
  formTitle = 'Passwort zurücksetzen';
  formMessage = 'Deine Passwort-Zurücksetzen Anfrage wird überprüft...';
  formLoading = true;
  usergreeting: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordService: PasswordService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: '',
      token: ''
    });

    this.route.queryParams
      .subscribe(params => {

        this.token = params['token'];

        if (this.token.length === 64) {
          this.verification(this.token);
          this.form.patchValue({token: this.token});

        } else {

          this.formVisible = false;
          this.formTitle = 'Fehler!';
          this.formMessage = 'Der vorhandene Token hat kein gültiges Format!';
          this.formLoading = false;
        }
      }
    );
  }

  verification(token: string) {
    this.passwordService.validatePasswordResetToken(this.token)
    .subscribe({
      next: (v: any) => { 
        this.usergreeting = 'Hallo ' + v.username + '!';
        this.formVisible = true;
        this.formMessage = 'Bitte gib dein neues Passwort, unter Berücksichtigung der Passwortkriterien, ein.';
        this.formLoading = false;
      },
      error: (e) => {
        this.formVisible = false;
        this.formTitle = 'Fehler!';
        this.formMessage = 'Dieser Token wurde nicht gefunden oder ist abgelaufen!';
        this.formLoading = false;
      },
      complete: () => {} 
    });
  }

  submit(): void {
    this.passwordService.updatePassword(this.form.getRawValue())
    .subscribe(
    {
        next: (v) => { 
          this.router.navigate(['/password-reseted']);
        },
        error: (err) => { 
          err = err.error.errors;
          //console.log(err);
          if (err.password && err.password.length > 0) { const p1E = err.password[0]; this.p1E = p1E; };
         },
        complete: () => { }
      }
    );
  }
}
