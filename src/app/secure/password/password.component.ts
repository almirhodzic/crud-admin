import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css', './../secure.component.css']
})
export class PasswordComponent implements OnInit {

  passwordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: [''],
      password_confirm: ['']
    });
  }

  passwordSubmit(): void {
    console.log(this.passwordForm.getRawValue());
  }

}
