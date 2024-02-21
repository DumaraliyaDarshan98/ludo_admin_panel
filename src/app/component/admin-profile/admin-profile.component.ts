import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SUCCESS } from 'src/app/constant/response-status.const';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  loginUser: any;

  full_name: FormControl = new FormControl('');
  mobile_no: FormControl = new FormControl('');
  email: FormControl = new FormControl('');

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService : AuthService,
    private notificationService : NotificationService
  ) {
    this.loginUser = this.localStorageService.getLogger();
    if(this.loginUser) {
        this.full_name.setValue(this.loginUser?.full_name);
        this.mobile_no.setValue(this.loginUser?.mobile_no)
        this.email.setValue(this.loginUser?.email)
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.loginUser);
  }

  submit() {
    if(!this.full_name.value) {
      return this.notificationService.showError('Please Enter Full Name');
    }

    if(!this.mobile_no.value) {
      return this.notificationService.showError('Please Enter Full Name');
    }

    if(!this.email.value) {
      return this.notificationService.showError('Please Enter Full Name');
    }

    const payload = {
      id : this.loginUser?.id,
      full_name : this.full_name.value,
      mobile_no : this.mobile_no.value,
      email : this.email.value
    }

    this.authService.updateProfile(payload).subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.localStorageService.updateUserDetails(response?.payload);
        this.notificationService.showSuccess('Profile Updated Successfully');
      } else {
        this.notificationService.showError('Something went wrong');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.error?.message || 'Something went wrong');
    })
  }
}
