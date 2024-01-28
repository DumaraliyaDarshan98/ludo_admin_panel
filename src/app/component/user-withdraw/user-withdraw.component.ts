import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SUCCESS } from 'src/app/constant/response-status.const';

@Component({
  selector: 'app-user-withdraw',
  standalone: true,
  imports: [CommonModule, NgFor, NgbDropdownModule, NgbModule, NgbCollapseModule, NgIf],
  templateUrl: './user-withdraw.component.html',
  styleUrls: ['./user-withdraw.component.scss']
})
export class UserWithdrawComponent implements OnInit {
  public isCollapsed = false;
  public isCollapsed2 = false;
  collapsed = true;

  withdrawHistory: any[] = [];

  constructor(
    private generalService: GeneralService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getWithdrawList();
  }

  // get wallet history
  getWithdrawList() {
    this.withdrawHistory = [];
    this.generalService.getUserWithdrawList().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.withdrawHistory = response?.payload?.data;
        console.log('this.userList', this.withdrawHistory)
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
    this.generalService.changeWithdrawStatus({ id: userId, status: status }).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.getWithdrawList();
        this.notificationService.showSuccess(response?.message || 'User Status Updated');
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Something Went Wrong');
    });
  }
}
