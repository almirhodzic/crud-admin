import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from './../../services/verification.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css', '../public.component.css']
})
export class VerifyAccountComponent implements OnInit {

  token!: string;
  statusIcon = 'bi-three-dots icon-gray';
  statusTitle = 'Verifizierung';
  statusInfoText = "Dein Account wird gerade verifiziert.\nGleich geht's weiter...";
  statusText: string = 'In Arbeit...';
  statusLink: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private verificationService: VerificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];

        if (this.token.length === 32) {
          this.verification(this.token);
        } else {
          this.statusIcon = 'bi-x-circle icon-red';
          this.statusTitle = 'Fehler!';
          this.statusInfoText = 'Bei der Verifizierung ist ein Fehler aufgetaucht.';
          this.statusText = '(Code ungültig)';
          this.statusLink = true;
          console.log('Dieser Code ist ungültig.');
        }
      }
    );
  }

  verification(token: string) {
    this.verificationService.verify(this.token)
    .subscribe({
      next: (v) => { 
        this.router.navigate(['/account-confirmed']);
      },
      error: (e) => {
        this.statusIcon = 'bi-info-circle icon-gray';
        this.statusInfoText = e.error.message;
        this.statusText = '';
        this.statusLink = true;
      },
      complete: () => {} 
    });
  }

}
