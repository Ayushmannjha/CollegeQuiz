import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
 
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    // Handle form submission logic
    this.authService.loginAdmin(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Store the response data in localStorage
        window.localStorage.setItem('adminData', JSON.stringify(response));
        window.location.href = '/teacher-dashboard';
        
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid login credentials. Please try again.';
      }
    );

  }


}
