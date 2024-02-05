import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  loginUser: any;

  full_name: FormControl = new FormControl('');
  mobile_no: FormControl = new FormControl('');
  email: FormControl = new FormControl('');

  constructor() {

  }

  ngOnInit(): void {

  }
}
