import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Make sure the path is correct

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  roll: any= null;
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Registration form submission handler
  onRegister(): void {
    if (this.roll && this.name && this.email && this.phone && this.password) {
      this.authService.registerStudent(this.name, this.email, this.phone, this.password, this.roll.toString())
        .subscribe(
          (response) => {
            // Handle successful registration response
            console.log('Registration successful:', response);
            console.log(response.questionStatusList);
            localStorage.setItem('userData', JSON.stringify(response));
            this.router.navigate(['/student-dashboard']);  // Redirect to login page after successful registration
          },
          (error) => {
            // Handle registration error
            console.error('Registration error:', error);
            this.errorMessage = 'Registration failed. Please try again.';
          }
        );
    } else {
      this.errorMessage = 'All fields are required.';
    }
  }
}
