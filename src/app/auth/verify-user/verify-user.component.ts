import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  defaultLoginForm = {
    userName: new FormControl("", [Validators.required]),
  };

  verifyEmailForm = new FormGroup(this.defaultLoginForm, []);
  loginUser: any;
  showLoader: boolean = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    // this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    // if (this.loginUser) {
    //   this.router.navigateByUrl('/dashboard');
    // }
  }

  verifyEmail(): void {
    this.verifyEmailForm.markAllAsTouched();
    if (this.verifyEmailForm.valid) {
      this.showLoader = true;
      this.authService.verifyEmail(this.verifyEmailForm.value).subscribe((response) => {
        if (response?.status == SUCCESS) {
          this.localStorageService.setLogger(response?.data);
          this.showLoader = false;
          this.router.navigateByUrl('/forgot-password', { state: { userName: this.verifyEmailForm.controls.userName.value } });
          this.notificationService.showSuccess(response?.message || 'User login successfully');
        } else {
          this.showLoader = false;
          this.notificationService.showError(response?.message);
        }
      }, (error) => {
        this.showLoader = false;
        this.notificationService.showError(error?.message || 'Something went wrong!');
      })
    }
  }


}
