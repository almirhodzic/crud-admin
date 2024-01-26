import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PasswordService } from './../../services/password.service';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.css', '../public.component.css']
})
export class PasswordSetComponent implements OnInit {

  token!: string;
  form! : FormGroup;
  formVisible = '0';
  formTitle = 'Passwort zurücksetzen';
  formMessage = 'Deine Passwort-Zurücksetzen Anfrage wird überprüft...';
  formLoading = true;
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordService: PasswordService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: '',
      passwordConfirm: ''
    });

    this.route.queryParams
      .subscribe(params => {

        this.token = params['token'];

        if (this.token.length === 64) {
          this.verification(this.token);
        } else {
          this.formVisible = '0';
          this.formTitle = 'Fehler!';
          this.formMessage = 'Bei der Verifizierung ist ein Fehler aufgetaucht.';
          this.formLoading = false;
        }
      }
    );
  }

  verification(token: string) {
    this.passwordService.validatePasswordResetToken(this.token)
    .subscribe({
      next: (v) => { 
        this.formVisible = '1';
        this.formMessage = 'Bitte gib dein neues Passwort ein.';
        this.formLoading = false;
      },
      error: (e) => {
        this.formVisible = '0';
        this.formTitle = 'Fehler!';
        this.formMessage = 'Token nicht vorhanden oder abgelaufen!';
        this.formLoading = false;
      },
      complete: () => {} 
    });
  }

  submit(): void {
    this.passwordService.updatePassword(this.token, this.form.getRawValue())
    .subscribe(
      {
        next: (v) => { 
          this.router.navigate(['/password-reseted']);
        },
        error: err => { },
        complete: () => { }
      }
    );
  }
}
