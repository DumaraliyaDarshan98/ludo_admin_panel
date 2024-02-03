import { Component, OnInit } from '@angular/core';
import { topcard, topcards } from './top-cards-data';
import { GeneralService } from 'src/app/services/general-services/general.service';
import { SUCCESS } from 'src/app/constant/response-status.const';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: topcard[];
  dashboardData: any;

  constructor(
    private generalService: GeneralService
  ) {

    this.topcards = topcards;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.generalService.getDashboardData().subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.dashboardData = response?.payload?.data;
        console.log('this.dashboardData ', this.dashboardData);
      } else {
        console.log('something went wrong', response);
      }
    }, (error) => {
      console.log('something went wrong error', error);
    });
  }
}
