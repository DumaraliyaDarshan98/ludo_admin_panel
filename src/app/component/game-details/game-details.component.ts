import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AdminVerifyResultComponent } from '../admin-verify-result/admin-verify-result.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameTableId: any;
  gameDetails : any = [];

  constructor(
    private route: ActivatedRoute,
    private generalService : GeneralService,
    private notificationService : NotificationService,
    private router : Router,
    private modalService: NgbModal
  ) {
    // this.gameTableId = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(params => {
      this.gameTableId = params.get('id'); // Get the id parameter
      console.log(' this.gameTableId', this.gameTableId)
    });
    if(!this.gameTableId) {
      this.router.navigateByUrl('/component/game-history');
    }
  }


  ngOnInit(): void {
    this.getHistoryDetails();
  }

  getHistoryDetails() {
    this.gameDetails = [];
    this.generalService.getGameHistoryDetails(this.gameTableId).subscribe((response) => {
      if(response?.status == SUCCESS) {
        console.log('response', response)
        this.gameDetails = response?.payload?.data;
        console.log(this.gameDetails);
        // console.log(this.gameDetails?.gamePlayer[1]?.playerOne?.email)
      } else {
        this.notificationService.showError('Something went wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something Went Wrong');
    });
  }

  // open result component
  openResultComponent() {
    const modalRef = this.modalService.open(AdminVerifyResultComponent);

    modalRef.componentInstance.gameDetails = this.gameDetails;

    modalRef.result.then((result) => {
      console.log('openResultComponent', result);
      this.getHistoryDetails();
    });
  }
}
