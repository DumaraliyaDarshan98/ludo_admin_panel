
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';

export enum AuthEndPoint {
  LOGIN_USER = '/admin/auth/login',
  VERIFY_EMAIL = '/admin/auth/verify',
  FORGOT_PASSWORD = '/admin/auth/forgot-password',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  login(payload: any): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + AuthEndPoint.LOGIN_USER, payload);
  }

  logout(): void {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl('/');
  }

  verifyEmail(payload: any): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + AuthEndPoint.VERIFY_EMAIL, payload);
  }

  forgotPassword(payload: any): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + AuthEndPoint.FORGOT_PASSWORD, payload);
  }

}
