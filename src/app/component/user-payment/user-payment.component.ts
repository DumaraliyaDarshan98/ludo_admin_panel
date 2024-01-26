import { Component } from '@angular/core';
import { Employee, TableRows } from '../table/table-data';
import { NgFor, NgIf } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-payment',
  standalone: true,
  imports: [NgFor, NgbDropdownModule, NgbModule, NgbCollapseModule, NgIf],
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss']
})
export class UserPaymentComponent {
  public isCollapsed = false;
  public isCollapsed2 = false;

  collapsed = true;

  trow: TableRows[];

  constructor() {

    this.trow = Employee;
  }
}
