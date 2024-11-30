import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide=true;
  form!:FormGroup;
  fb = inject(FormBuilder);

  login(){}

  ngOnInit(): void {
    this.form = this.fb.group
    ({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }
}
