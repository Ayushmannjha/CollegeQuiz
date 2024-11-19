import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentDashBoardComponent } from './student-dash-board/student-dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AnswerPanelComponent } from './answer-panel/answer-panel.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentProfileCheckComponent } from './student-profile-check/student-profile-check.component';
import { AnswerCheckingComponent } from './answer-checking/answer-checking.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentDashBoardComponent,
    LoginComponent,
    AnswerPanelComponent,
    RegistrationComponent,
    AdminLoginComponent,
    TeacherDashboardComponent,
    StudentProfileCheckComponent,
    AnswerCheckingComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
