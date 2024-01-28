import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SUCCESS } from 'src/app/constant/response-status.const';

@Component({
  selector: 'app-user-payment',
  standalone: true,
  imports: [CommonModule, NgFor, NgbDropdownModule, NgbModule, NgbCollapseModule, NgIf],
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss']
})
export class UserPaymentComponent implements OnInit{
  public isCollapsed = false;
  public isCollapsed2 = false;
  collapsed = true;

  walletHistory: any[] = [];

  constructor(
    private generalService: GeneralService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getWalletHistory();
  }

  // get wallet history
  getWalletHistory() {
    this.walletHistory = [];
    this.generalService.getUserWalletList().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.walletHistory = response?.payload?.data;
        console.log('this.userList', this.walletHistory)
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Something Went Wrong');
    });
  }

  // user status change
  statusChange(userId: number, status: number) {
    console.log('status change', status);
    this.generalService.changeWalletStatus({ id: userId, status: status }).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.getWalletHistory();
        this.notificationService.showSuccess(response?.message || 'User Status Updated');
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Something Went Wrong');
    });
  }
}
