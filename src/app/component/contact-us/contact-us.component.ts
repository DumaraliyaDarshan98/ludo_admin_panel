import { Payload } from './../../constant/payload.const';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { Component, OnInit } from '@angular/core';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsDetails: any;

  email: FormControl = new FormControl('');
  intagram : FormControl = new FormControl('');
  telegram: FormControl = new FormControl('');
  whatsapp : FormControl = new FormControl('');

  constructor (
    private generalService : GeneralService,
    private notificationService : NotificationService
  ) {}

  ngOnInit(): void {
    this.getContactUsDetails();
  }

  // get contactDetails
  getContactUsDetails() {
    this.generalService.getContactUsDetails().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.contactUsDetails = response?.payload?.data;
        this.email.setValue(this.contactUsDetails?.email || '');
        this.intagram.setValue(this.contactUsDetails?.intagram || '');
        this.telegram.setValue(this.contactUsDetails?.telegram || '');
        this.whatsapp.setValue(this.contactUsDetails?.whatsapp || '');
      }
    }, (error) => {
      this.notificationService.showError('Error')
    })
  }

  // add edit contact details
  addEditContactDetails() {
    const payload : any = {
      email : this.email.value || this.contactUsDetails.email,
      intagram : this.intagram.value || this.contactUsDetails.intagram,
      telegram : this.telegram.value || this.contactUsDetails.telegram,
      whatsapp : this.whatsapp.value || this.contactUsDetails.whatsapp
    }

    if(this.contactUsDetails?.id) {
      payload['id'] = this.contactUsDetails?.id
    }

    this.generalService.addEditContactUs(payload).subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.getContactUsDetails();
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError('Not updated contact us');
    });
  }
}
