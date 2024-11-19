import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { AuthService } from '../auth.service';     // Import AuthService

@Component({
  selector: 'app-student-profile-check',
  templateUrl: './student-profile-check.component.html',
  styleUrls: ['./student-profile-check.component.css']
})
export class StudentProfileCheckComponent implements OnInit {
  student: any;                // To store student information
  question: any[] = [];        // To store questions related to the student
  questionStatusList: any[] = [];  // To store the status of the questions
  rollNo: any = null;              // To store the roll number passed in the route
  studentData:any = null;
  constructor(
    private route: ActivatedRoute,  // To access the route parameters
    private authService: AuthService // To use the searchStudent method
  ) {}

  ngOnInit(): void {
    // Get the 'roll' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.rollNo = +params.get('roll')!;
      const storedData = localStorage.getItem('studentData');
    if (storedData) {
        this.studentData = JSON.parse(storedData);
        console.log(this.studentData.student);
        
      
      this.student = this.studentData.student;
      this.question = this.studentData.question
      this.questionStatusList = this.studentData.questionStatusList
    }
      
      
      // Convert the roll number from string to number
         // Fetch student data for the given roll number
    });
  }
  fetchCheckPanelDetails(roll: number, questionId: number, qno: number): void {
    this.authService.checkPanel(roll, questionId, qno).subscribe(
      (response) => {
        const key = 'check-panel-data';
          window.localStorage.setItem(key,JSON.stringify(response));
          const storedData = JSON.parse(window.localStorage.getItem('check-panel-data') || '{}');
          console.log(storedData);
          window.location.href = 'answer-checking';
          
      },
      (error) => {
        console.error('Error fetching check panel details:', error);
      }
    );
  }
  
  
  // Call the searchStudent method in AuthService
  getStatus(questionId: number): number {
    const status = this.questionStatusList.find((s) => s.questionId === questionId);
    return status ? status.approvedStatus : 0;
  }
  getSubmitStatus(questionId: number): number {
    const status = this.questionStatusList.find((s) => s.questionId === questionId);
    return status ? status.submissionStatus : 0;
  }
  toggleDetails(questionId: number): void {
    alert(`Toggling details for question ID: ${questionId}`);
  }

}
