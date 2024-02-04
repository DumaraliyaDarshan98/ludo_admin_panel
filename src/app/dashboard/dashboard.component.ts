import { Component, AfterViewInit, OnInit } from '@angular/core';
import { GeneralService } from '../services/general-services/general.service';
import { SUCCESS } from '../constant/response-status.const';
import { NotificationService } from '../services/notification/notification.service';
import { FormControl } from '@angular/forms';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnInit {
  subtitle: string;
  commissionDetails : any;
  commission: FormControl = new FormControl('');

  constructor(
    private generalService : GeneralService,
    private notificationService : NotificationService,
  ) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit(): void {
    this.getAdminCommission();
  }

  ngAfterViewInit() { }

  // get admin commission details
  getAdminCommission() {
    this.generalService.getCommissionDetails().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.commissionDetails = response?.payload?.data;
        this.commission.setValue(this.commissionDetails?.commission || '');
      }
    }, (error) => {
      this.notificationService.showError('Error')
    })
  }

  // add edit admin commission details
  addEditCommission() {
    if(!this.commission.value) {
      return this.notificationService.showError('PLease Enter Commission');
    }

    const payload: any = {
      commission : this.commission.value
    }

    if (this.commissionDetails?.id) {
      payload['id'] = this.commissionDetails?.id
    }

    this.generalService.addEditCommission(payload).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.getAdminCommission();
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError('Not updated contact us');
    });
  }
}
