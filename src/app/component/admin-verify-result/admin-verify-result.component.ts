import { GeneralService } from 'src/app/services/general-services/general.service';
import { NotificationService } from './../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from 'src/app/constant/response-status.const';

@Component({
  selector: 'app-admin-verify-result',
  templateUrl: './admin-verify-result.component.html',
  styleUrls: ['./admin-verify-result.component.scss']
})
export class AdminVerifyResultComponent implements OnInit {
  gameDetails: any;
  player1: FormControl = new FormControl('');
  player2: FormControl = new FormControl('');

  constructor(
    private activeModal: NgbActiveModal,
    private notificationService: NotificationService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.player1.valueChanges.subscribe((value: string) => {
      if (value == '6') {
        this.player2.setValue('7');
      }
      if (value == '7') {
        this.player2.setValue('6');
      }
    });

    this.player2.valueChanges.subscribe((value: string) => {
      if (value == '6') {
        this.player1.setValue('7');
      }
      if (value == '7') {
        this.player1.setValue('6');
      }
    });
  }

  close(flag?: boolean): void {
    this.activeModal.close(flag);
  }

  submit() {
    if (!this.player1.value || !this.player2.value) {
      return this.notificationService.showError('PLease Select Result');
    }

    const payload = {
      game_table_id: this.gameDetails?.id,
      playerDetails: [
        {
          id: this.gameDetails?.gamePlayer[0]?.p_id,
          status: this.player1.value
        }, {
          id: this.gameDetails?.gamePlayer[1]?.p_id,
          status: this.player2.value
        }
      ]
    }

    this.generalService.verifyGameResult(payload).subscribe((response) => {
      if (response?.status == SUCCESS) {
        this.notificationService.showSuccess('Result Updated Successfully');
      } else {
        this.notificationService.showError('Please Retry After SomeTime');
      }
      this.close(true);
    }, (error) => {
      this.notificationService.showError(error?.error?.error?.message || 'Please Retry After SomeTime');
    });

    console.log(payload)
  }
}
