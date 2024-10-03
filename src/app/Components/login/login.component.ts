import { IsAuthenticatedService } from './../../Service/is-authenticated.service';
import { Component, output, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Initialize errorMessage
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private isAuthenticatedService :IsAuthenticatedService
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        EmployeeName: this.loginForm.value.name,
        Password: this.loginForm.value.password,
      };

      this.authService.login(loginData).subscribe(
        (response) => {
          console.log(response.token);
          localStorage.setItem('token', response.token);
          this.isAuthenticatedService.setAuthState(true); 
          this.router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          // Check if the error has a message to display
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // Display the backend error message
          } else {
            this.errorMessage = 'Invalid username or password'; // Fallback message
          }
          console.error('Login failed', error);
        }
      );
    }
  }
}
