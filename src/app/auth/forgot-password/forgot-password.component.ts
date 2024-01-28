import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  defaultForgotPasswordForm = {
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  };

  forgotPasswordForm = new FormGroup(this.defaultForgotPasswordForm, []);
  showLoader: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    const state: any = this.router?.getCurrentNavigation()?.extras.state;
    console.log('state', state)
    if (!state?.userName) {
      this.router.navigateByUrl('/verify-user')
    }
    this.forgotPasswordForm.get('userName')?.setValue(state?.userName)
  }

  ngOnInit() {
  }

  forgotPassword() {
    this.forgotPasswordForm.markAllAsTouched();
    if (this.forgotPasswordForm.valid) {
      // this.forgotPassword();
      this.showLoader = true;
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((response) => {
        if (response?.status === SUCCESS) {
          this.notificationService.showSuccess(response?.message);
          this.showLoader = false;
          this.router.navigate(['/login']);
        } else {
          this.notificationService.showError(response?.message);
          this.showLoader = false;
        }
      }, (error) => {
        this.notificationService.showError(error?.message);
        this.showLoader = false;
      });
    }
  }

}
