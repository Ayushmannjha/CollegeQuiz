import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-answer-checking',
  templateUrl: './answer-checking.component.html',
  styleUrls: ['./answer-checking.component.css']
})
export class AnswerCheckingComponent implements OnInit {
  student: any = null;
  questionStatus: any = null;
  qno: any = null;
  question: any = null;
  selectedStatus: string = '';
  statusOptions = ['Correct', 'Incorrect'];
  message: string = ''; // For displaying messages

  body = {
    questionId: 0,
    roll: 0,
    status: '' // Initialize status as an empty string
  };

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    // Retrieve data from localStorage
    const answerChecking = localStorage.getItem('check-panel-data');
    
    if (answerChecking) {
      try {
        const parsedData = JSON.parse(answerChecking);
        console.log(parsedData.questionStatus);
        console.log(parsedData);
        // Validate parsedData structure before assigning
        this.qno =  parsedData.qno;
        this.student = parsedData.student || null;
        this.questionStatus = parsedData.questionStatus || null;
        this.question = parsedData.question || null;
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    } else {
      console.error('No "answer-checking" object found in localStorage.');
    }
  }

  updateQuestionStatus(): void {
    if (!this.selectedStatus) {
      this.message = 'Please select a status before submitting.';
      return;
    }
  
    // Ensure required data is available
    if (!this.student || !this.question) {
      this.message = 'Student or question data is missing.';
      return;
    }
  
    // Updating the body before making the API call
    this.body.roll = this.student.roll; // Assuming `roll` is part of the student object
    this.body.questionId = this.question.id; // Assuming `id` is part of the question object
    this.body.status = this.selectedStatus.toLowerCase();
    console.log('Request Payload:', this.body);
  
    this.authservice.updateQuestionStatus(this.body.questionId, this.body.roll, this.body.status).subscribe({
      next: (response) => {
        console.log('Question status updated successfully:', response);
        console.log(response.questionStatusList);
  
        // Retrieve the existing studentData from localStorage
        const storedData = localStorage.getItem('studentData');
        
        if (storedData) {
          // Parse the stored data
          const studentData = JSON.parse(storedData);
          
          // Update the questionStatusList with the new data from the response
          if (studentData && response.questionStatusList) {
            studentData.questionStatusList = response.questionStatusList;
            
            // Save the updated studentData back to localStorage
            localStorage.setItem('studentData', JSON.stringify(studentData));
          }
        }
  
        this.message = 'Status updated successfully!';
      },
      error: (err) => {
        console.error('Error updating question status:', err);
        this.message = 'Failed to update status. Please try again.';
      }
    });
  }
  
}
