import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  NgbDropdownModule,
  NgbModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { SUCCESS } from 'src/app/constant/response-status.const';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgbDropdownModule, NgbModule, NgbCollapseModule, NgIf],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public isCollapsed = false;
  public isCollapsed2 = false;
  collapsed = true;

  userList: any[] = [];

  constructor(
    private generalService: GeneralService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  // user list API
  getUserList() {
    this.userList = [];
    this.generalService.getUserList().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.userList = response?.payload?.data;
        console.log('this.userList', this.userList)
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
    this.generalService.changeUerStatus({ id: userId, status: status }).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.getUserList();
        this.notificationService.showSuccess(response?.message || 'User Status Updated');
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Something Went Wrong');
    });
  }
}
