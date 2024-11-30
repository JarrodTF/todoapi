import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '../../interfaces/validation-error';

@Component({
  selector: 'app-register',
  imports: [MatInputModule, MatIconModule, RouterLink, ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  fb=inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar)
  registerForm!:FormGroup;
  confirmPasswordHide:boolean = true;
  passwordHide:boolean = true;
  errors!:ValidationErrors[];

  register(){
    this.authService.register(this.registerForm.value).subscribe({
      next:(response) => {
        console.log(response);

        this.matSnackBar.open(response.message, 'Close',{
          duration: 5000,
          horizontalPosition: 'center',
        });
      },

      error: (err:HttpErrorResponse) =>{
        if(err!.status === 400){
          this.errors = err!.error;
          this.matSnackBar.open('Validations error', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          });
        }
      },

      complete:() => console.log('Register success'),
    });
  }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required]],
      name:['', Validators.required],
      confirmPassword:['', Validators.required],
    }, 
    {
      validator:this.passwordMatchValidator,
    }
  );
    //roles here
  }

  private passwordMatchValidator(control:AbstractControl):{[key:string]:boolean} | null{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      return {'passwordMismatch' : true}
    }

    return null;
  }
}
