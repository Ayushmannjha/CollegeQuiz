import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dash-board',
  templateUrl: './student-dash-board.component.html',
  styleUrls: ['./student-dash-board.component.css']
})
export class StudentDashBoardComponent implements OnInit {
  filteredStatusList:any = [];
 

  constructor(private router: Router) {}
  student:any = null;
  userData: any = null;
  roll:any = null;
  questions:any=null;
  submitted:any=null;
  correct:any=null;
  incorrect:any=null;
  approved:any=null;
  ngOnInit(): void {
    // Retrieve the stored data from localStorage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      console.log('Retrieved data in StudentDashboardComponent:', this.userData);
      console.log(this.userData.student);
      console.log(this.userData.questionStatusList);
      this.userData.questionStatusList.forEach((questionStatus: any) => {
        // Check the submission status
        if (questionStatus.submissionStatus === 1) {
          this.submitted++;
        }
    
        // Check the approved status
        if (questionStatus.approvedStatus === 1) {
          this.approved++;
        }
    
        // Check if the question is correct
        if (questionStatus.isCorrect === 1) {
          this.correct++;
        }
    
        // Check if the question is incorrect
        if (questionStatus.isCorrect === 2) {
          this.incorrect++;
        }
      });
      console.log(this.submitted,this.approved,this.correct,this.correct)
      this.student = this.userData.student;
      this.roll = this.userData.student.roll;
      this.questions = this.userData.questions;
      this.filteredStatusList = this.filterStatusList(this.userData.questionStatusList);
    } else {
      console.error('No user data found in localStorage');
    }
  }

  filterStatusList(statusList: any[]) {
    const uniqueStatusMap = new Map<string, boolean>();
  
    return statusList.filter((statusItem) => {
      // Create a unique identifier for each status item based on its properties
      const uniqueKey = `${statusItem.questionId}-${statusItem.submissionStatus}-${statusItem.approvedStatus}-${statusItem.isCorrect}`;
  
      // If this combination already exists, it will be skipped
      if (uniqueStatusMap.has(uniqueKey)) {
        return false;
      } else {
        // Otherwise, mark it as encountered and return true
        uniqueStatusMap.set(uniqueKey, true);
        return true;
      }
    });
  }
  
  expandedQuestions: Map<number, boolean> = new Map();

  toggleQuestionDetails(questionId: number): void {
    const isExpanded = this.expandedQuestions.get(questionId) || false;
    this.expandedQuestions.set(questionId, !isExpanded);
  }

  isQuestionExpanded(questionId: number): boolean {
    return this.expandedQuestions.get(questionId) || false;
  }
  logout(): void {
    // Clear all local storage data
    localStorage.clear();

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
