import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameTableId: any;

  constructor(
    private route: ActivatedRoute,
    private generalService : GeneralService,
    private notificationService : NotificationService,
  ) {
    this.gameTableId = this.route.snapshot.paramMap.get('id');
    console.log('this.gameTableId', this.gameTableId)
  }


  ngOnInit(): void {
    this.getHistoryDetails();
  }

  getHistoryDetails() {
    this.generalService.getGameHistoryDetails(this.gameTableId).subscribe((response) => {
      if(response?.status == SUCCESS) {
        console.log('response', response)
      } else {
        this.notificationService.showError('Something went wrong');
      }
    }, (error) => {
      this.notificationService.showError('Something Went Wrong');
    });
  }
}
