import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Auth } from './../../classes/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../secure.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: ''
    });

    Auth.userEmitter.subscribe(
      user => {
        this.profileForm.patchValue(user);
      }
    );
  }

  profileSubmit(): void {
    this.authService.updateProfile(this.profileForm.getRawValue())
    .subscribe(user => Auth.userEmitter.emit(user));
  }

}
