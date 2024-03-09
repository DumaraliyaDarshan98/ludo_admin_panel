import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-withdraw-detail',
  templateUrl: './withdraw-detail.component.html',
  styleUrls: ['./withdraw-detail.component.scss']
})
export class WithdrawDetailComponent implements OnInit {
  withdrawId: any;
  withdrawDetails: any;
  UserDetails: any;

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    // this.gameTableId = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(params => {
      this.withdrawId = params.get('id'); // Get the id parameter
      console.log(' this.withdrawId', this.withdrawId)
    });
    if (!this.withdrawId) {
      this.router.navigateByUrl('/component/user-withdraw');
    }
  }

  ngOnInit(): void {
    this.getWithDrawDetails();
  }

  getWithDrawDetails() {
    this.generalService.getWithDrawDetails(this.withdrawId).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.withdrawDetails = response?.payload?.data;
        this.UserDetails = response?.payload?.data?.userDetail;
        console.log(this.withdrawDetails)
      } else {
        return this.notificationService.showError('Something Went Wrong Please After Some Time');
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.error?.message || 'Error');
    });
  }

  // user status change
  statusChange(status: number) {
    console.log('status change', status);
    this.generalService.changeWithdrawStatus({ id: this.withdrawId, status: status }).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.getWithDrawDetails();
        this.notificationService.showSuccess(response?.message || 'User Status Updated');
      } else {
        this.notificationService.showError('Error');
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Something Went Wrong');
    });
  }
}
