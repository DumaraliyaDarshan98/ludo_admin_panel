import { NotificationService } from './../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { SUCCESS } from 'src/app/constant/response-status.const';
import { GeneralService } from 'src/app/services/general-services/general.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {
  gameHistory : any[] = [];

  constructor(
    private generalService : GeneralService,
    private notificationService : NotificationService
  ) { }

  ngOnInit(): void {
    this.getGameHistory();
  }

  // get game history
  getGameHistory() {
    this.gameHistory = [];
    this.generalService.getGameHistory().subscribe((response) => {
      if(response?.status == SUCCESS) {
        this.gameHistory = response?.payload?.data;
        console.log(this.gameHistory ,'sdd')
      } else {
        this.notificationService.showError('Something went wrong');
      }
    },(error) => {
      this.notificationService.showError('Error');
    });
  }
}
