import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {


  public notificaionList: any = [];

  constructor(
    private generalService: GeneralService,
    private notificationService: NotificationService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getNotificationList();
  }

  getNotificationList() {
    this.generalService.getNotificationList().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificaionList = response?.payload?.data;
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError('Error');
    })
  }

  edit(data:any) {
    localStorage.setItem('notificationData', JSON.stringify(data));
    this.router.navigateByUrl('/component/notification-addedit')
  }

}
