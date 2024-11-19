import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://13.235.115.172:8082'; // Replace with your backend base URL

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email, password: password };

    return this.http.post<any>(`${this.baseUrl}/login`, body, { headers });
  }

  loginAdmin(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email, password: password };

    return this.http.post<any>(`${this.baseUrl}/admin-login`, body, { headers });
  }

  // Register student method
  registerStudent(
    name: string,
    email: string,
    phone: string,
    password: string,
    roll: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = new URLSearchParams({
      name,
      email,
      phone,
      password,
      roll,
    });

    return this.http.post<any>(
      `${this.baseUrl}/register-student?${params.toString()}`,
      {},
      { headers }
    );
  }

  // Upload question method
  uploadQuestion(description: string, topic: string): Observable<any> {
    const params = new URLSearchParams({ description, topic });
  
    return this.http.post<any>(
      `${this.baseUrl}/uploadQuestion?${params.toString()}`,
      {}, // No body is required for GET or query string-based requests
    );
  }

  // Submit answer method
  submitAnswer(
    questionId: any,
    roll: any,
    answer: any
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = { questionId, roll, answer };

    return this.http.post<any>(
      `${this.baseUrl}/submit-answer`,
      body,
      { headers }
    );
  }

  // Update question status method
  updateQuestionStatus(
    questionId: number,
    roll: number,
    status: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = { questionId, roll, status };

    return this.http.post<any>(
      `${this.baseUrl}/updateQuestionStatus`,
      body,
      { headers }
    );
  }
  getAnswerPanelData(roll: number, questionId: number, qno: string): Observable<any> {
    const params = { roll, questionId, qno };
    return this.http.get<any>(`${this.baseUrl}/answer-panel`, { params });
  }

  searchStudent(roll: number): Observable<any> {
    const params = { roll };
    return this.http.get<any>(`${this.baseUrl}/searchStudent`, { params });
  }
  checkPanel(roll: number, questionId:number,qno:number): Observable<any> {
    const params = { roll,questionId,qno };
    return this.http.get<any>(`${this.baseUrl}/check-panel`, { params });
  }
  // Fetch home page message (test)
  getHomeMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}/home`, { responseType: 'text' });
  }
  
}
