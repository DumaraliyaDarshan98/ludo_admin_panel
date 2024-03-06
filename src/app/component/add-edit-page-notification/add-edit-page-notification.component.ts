import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-add-edit-page-notification',
  templateUrl: './add-edit-page-notification.component.html',
  styleUrls: ['./add-edit-page-notification.component.scss']
})
export class AddEditPageNotificationComponent {

  constructor(
    private generalService: GeneralService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    const data = localStorage.getItem('pageNotificationData');
    data ? this.notificationData = JSON.parse(data) : this.notificationData = null;
  }

  addNotificationForm = {
    title: new FormControl("", [Validators.required,]),
    message: new FormControl("", [Validators.required]),
    page: new FormControl("", [Validators.required,]),
  };

  notificationForm = new FormGroup(this.addNotificationForm, []);
  notificationData: any;

  ngOnInit(): void {
    if (this.notificationData) {
      this.setProjectDetails();
    }
  }

  setProjectDetails() {
    this.notificationForm.controls.message.setValue(this.notificationData?.message || '');
    this.notificationForm.controls.title.setValue(this.notificationData?.title || '');
    this.notificationForm.controls.page.setValue(this.notificationData?.page || '');
    console.log(this.notificationData?.image);
  }

  submitForm() {
    if (this.notificationData) {
      this.editNotification();
    } else {
      this.addNotification();
    }
  }

  addNotification() {
    this.notificationForm.markAllAsTouched();
    if (!this.notificationForm.valid) {
      return this.notificationService.showError('Please fill the form all details!');
    }
    this.generalService.addEditPageNotification(this.notificationForm.value).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Add Notification successfully !');
        this.router.navigateByUrl('/component/page-notification');
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.error?.message);
    });
  }

  editNotification() {
    this.notificationForm.markAllAsTouched();
    if (!this.notificationForm.valid) {
      return this.notificationService.showError('Please fill the form all details!');
    }
    this.generalService.addEditPageNotification({...this.notificationForm.value, id : this.notificationData.id }).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Add Notification successfully !');
        this.router.navigateByUrl('/component/page-notification');
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.error?.message);
    });
  }
}
