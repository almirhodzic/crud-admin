import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Auth } from './../../classes/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../secure.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  username: string = '';
  userid: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      birthday: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      zipcode: '',
      city: '',
      role: '',
    });

    Auth.userEmitter.subscribe(user => {
      if(user){
        this.profileForm.patchValue(user);
        this.username = user.first_name;
        this.userid = user.id;
        }
      }
    );
  }

  profileSubmit(): void {
    this.authService.updateProfile(this.profileForm.getRawValue())
    .subscribe(user => Auth.userEmitter.next(user));
  }
}
