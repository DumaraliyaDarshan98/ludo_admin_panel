import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-addedit',
  templateUrl: './notification-addedit.component.html',
  styleUrls: ['./notification-addedit.component.scss']
})
export class NotificationAddeditComponent {

  state: any = [];
  imageToUpload: any;
  imageSrc!: any;

  constructor(
    private generalService: GeneralService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    const data = localStorage.getItem('notificationData');
    data ? this.notificationData = JSON.parse(data) : this.notificationData = null;
  }


  addNotificationForm = {
    title: new FormControl("", [Validators.required,]),
    message: new FormControl("", [Validators.required]),
    image: new FormControl(""),
  };

  notificationForm = new FormGroup(this.addNotificationForm, []);
  notificationData : any;

  ngOnInit(): void {
    if (this.notificationData) {
      this.setProjectDetails();
    }

  }

  setProjectDetails() {
    this.notificationForm.controls.image.setValue(this.notificationData?.image || '');
    this.notificationForm.controls.message.setValue(this.notificationData?.message || '');
    this.notificationForm.controls.title.setValue(this.notificationData?.title || '');
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
    const data = new FormData();
    data.append('image', this.imageToUpload);
    data.append('message', this.notificationForm?.controls?.message?.value || '');
    data.append('title', this.notificationForm.controls.title.value || '');
    this.notificationForm.markAllAsTouched();
    if (!this.notificationForm.valid) {
      return this.notificationService.showError('Please fill the form all details!');
    }
    this.generalService.addEditNotification(data).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Add Notification successfully !');
        this.router.navigateByUrl('/component/notification');
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
    });
  }

  editNotification() {
    const data = new FormData();
    data.append('image', this.imageToUpload || this.notificationData?.image);
    data.append('id', this.notificationData?.id);
    data.append('message', this.notificationForm?.controls?.message?.value || '');
    data.append('title', this.notificationForm.controls.title.value || '');
    this.notificationForm.markAllAsTouched();
    if (!this.notificationForm.valid) {
      return this.notificationService.showError('Please fill the form all details!');
    }
    this.generalService.addEditNotification(data).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Add Notification successfully !');
        this.router.navigateByUrl('/component/notification');
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
    });
  }

   // Handle the file change event
   addFiles(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imageToUpload = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result
      };
      reader.readAsDataURL(file);
    }
  }

}
