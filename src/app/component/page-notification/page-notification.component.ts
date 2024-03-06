import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-page-notification',
  templateUrl: './page-notification.component.html',
  styleUrls: ['./page-notification.component.scss']
})
export class PageNotificationComponent {


  public notificationList: any = [];

  constructor(
    private generalService: GeneralService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNotificationList();
  }

  getNotificationList() {
    this.generalService.getPageNotificationList().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationList = response?.payload?.data;
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError('Error');
    })
  }

  edit(data: any) {
    localStorage.setItem('pageNotificationData', JSON.stringify(data));
    this.router.navigateByUrl('/component/add-edit-page-notification')
  }

  add() {
    localStorage.removeItem('pageNotificationData');
    this.router.navigateByUrl('/component/add-edit-page-notification')
  }

  deleteNoti(id:any) {
    this.generalService.deletePageNotification(id).subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.getNotificationList()
      }
    })
  }
}
