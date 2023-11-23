import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../secure.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['']
    });    
  }

  profileSubmit(): void {
    console.log(this.profileForm.getRawValue());
  }

}
