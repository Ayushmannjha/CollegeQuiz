import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent {
  question = {
    description: '',
    topic: '',
  };
  studentRollNo:any = null;
  studentDetails: any = null;
  uploadSuccess = false;
  searchAttempted = false;

  constructor(private http: AuthService) {}

  uploadQuestion(event: Event) {
    event.preventDefault();
    this.http.uploadQuestion(this.question.description, this.question.topic).subscribe(
      (response) => {
        console.log(response);
        this.uploadSuccess = true; // Update success state
      },
      (error) => {
        console.error('Error uploading question:', error);
        alert('Error uploading question. Please try again.');
      }
    );
  } 
  searchStudent(event: Event) {
    console.log("searchstudent");
    this.http.searchStudent(this.studentRollNo).subscribe(
      (response) => {
        if (response && response.student) {
          console.log(response);
          window.localStorage.setItem('studentData',JSON.stringify(response));
          window.location.href='search-student/'+this.studentRollNo;
          
        } else {
          alert(response.message || 'Something went wrong');
        }
      },
      (error) => {
        console.error('Error fetching student details:', error);
        alert('Error fetching student details');
      }
    );
    
  }
}
