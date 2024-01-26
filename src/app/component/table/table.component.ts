import { Component } from '@angular/core';
import { TableRows, Employee } from './table-data';
import { NgFor, NgIf } from '@angular/common';
import {
  NgbDropdownModule,
  NgbModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgbDropdownModule, NgbModule, NgbCollapseModule, NgIf],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public isCollapsed = false;
  public isCollapsed2 = false;

  collapsed = true;

  trow: TableRows[];

  constructor() {

    this.trow = Employee;
  }
}
