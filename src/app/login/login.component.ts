import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  

  constructor(private authService: AuthService,private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Store the response data in localStorage
        window.localStorage.setItem('userData', JSON.stringify(response));
        // Redirect to the StudentDashboard component using window.location.href
        window.location.href = '/student-dashboard';
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid login credentials. Please try again.';
      }
    );
  }
}
