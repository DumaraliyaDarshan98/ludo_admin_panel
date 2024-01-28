import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const AuthRoutes: Routes = [
  // {
  //   path: '**',
  //   redirectTo : 'login'
  // },
  {
    path: 'verify-user',
    component: VerifyUserComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    VerifyUserComponent,
    ForgotPasswordComponent
  ],
})
export class AuthModule { }
