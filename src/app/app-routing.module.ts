import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentDashBoardComponent } from './student-dash-board/student-dash-board.component';
import { AnswerPanelComponent } from './answer-panel/answer-panel.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentProfileCheckComponent } from './student-profile-check/student-profile-check.component';
import { AnswerCheckingComponent } from './answer-checking/answer-checking.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'student-dashboard', component: StudentDashBoardComponent },
  {path:'registration',component:RegistrationComponent},
  {path:'admin-login',component:AdminLoginComponent},
  {path:'teacher-dashboard',component:TeacherDashboardComponent},
  {path:'search-student/:roll', component:StudentProfileCheckComponent},
  {path:'answer-checking', component:AnswerCheckingComponent},
  { path: 'answer-panel/:roll/:questionId/:index', component: AnswerPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
