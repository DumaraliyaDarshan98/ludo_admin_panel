import { NotificationService } from './../../services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-verify-result',
  templateUrl: './admin-verify-result.component.html',
  styleUrls: ['./admin-verify-result.component.scss']
})
export class AdminVerifyResultComponent implements OnInit {
  gameDetails: any;
  player1 : FormControl = new FormControl('');
  player2 : FormControl = new FormControl('');

  constructor(
    private activeModal: NgbActiveModal,
    private notificationService : NotificationService
  ) {}

  ngOnInit(): void {
    this.player1.valueChanges.subscribe((value: string) => {
      if(value == '6') {
        this.player2.setValue('7');
      }
      if(value == '7') {
        this.player2.setValue('6');
      }
    });

    this.player2.valueChanges.subscribe((value: string) => {
      if(value == '6') {
        this.player1.setValue('7');
      }
      if(value == '7') {
        this.player1.setValue('6');
      }
    });
  }

  close(flag?: boolean): void {
    this.activeModal.close(flag);
  }

  submit() {
    if(!this.player1.value || !this.player2.value) {
      return this.notificationService.showError('PLease Select Result');
    }

    const payload = {
        game_table_id : this.gameDetails?.id,
        player_one_id : this.player1.value,
        player_two_id : this.player2.value
    }

    console.log(payload)
  }
}
