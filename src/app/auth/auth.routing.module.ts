import { Routes } from '@angular/router';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';


export const AuthRoutes: Routes = [
	{
		path: '',
		children: [
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
		]
	}
];
