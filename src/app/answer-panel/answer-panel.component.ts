import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-answer-panel',
  templateUrl: './answer-panel.component.html',
  styleUrls: ['./answer-panel.component.css'],
})
export class AnswerPanelComponent implements OnInit {
  roll: number = 0;
  questionId: number=0;
  index: number | null = null;
  student: any = null;
  question: any = null;
  qno: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  answer: string = '';
  message: string = ''; // Message to display below the button
isSuccess: boolean = false; // Determines if the message is a success or error
isAnswerSubmitted: boolean = false;
  constructor(private route: ActivatedRoute, private apiService: AuthService) {}

  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roll = Number(params.get('roll'));
      this.questionId = Number(params.get('questionId'));
      this.qno = params.get('index') || '';
      this.fetchQuestionDetails();
    });
  }

  fetchQuestionDetails(): void {
    // Replace with API call to fetch question details
    this.apiService.getAnswerPanelData(this.roll, this.questionId, this.qno).subscribe({
      next: (response) => {
        this.student = response.student;
        this.question = response.question;
      },
      error: (err) => {
        console.error('Error fetching question data:', err);
      },
    });
  }

  disableCopyPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent copying/pasting
  }

  submitAnswer(): void {
    this.isSubmitting = true;

    const formData = {
      roll: this.roll,
      questionId: this.questionId,
      answer: this.answer,
    };

    this.apiService.submitAnswer(this.questionId,this.roll,this.answer).subscribe({
      
      next: (response) => {
        alert('Answer submitted successfully!');
        this.isSubmitting = false;
        this.isAnswerSubmitted = true;
        console.log();
        console.log(response);
        console.log(response.questionStatusList);
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.questionStatusList = response.questionStatusList;
        localStorage.setItem('userData', JSON.stringify(userData));
            },
      error: (err) => {
        console.error('Error submitting answer:', err);
        alert('An error occurred while submitting the answer.');
        this.isSubmitting = false;
      },
    });
  }
}