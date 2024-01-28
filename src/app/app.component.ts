import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loginUser: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router : Router
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    if(!this.loginUser) {
      this.router.navigateByUrl('/login');
    }
    // else {
    //   this.router.navigateByUrl('/dashboard');
    // }
  }
}
