import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';

export enum APIEndPoint {
  USER_LIST = "/admin/user-list",
  USER_WALLET_LIST = "/admin//user-wallet-list",
  USER_WITHDRAW_LIST = "/admin/user-withdraw-list",
  CHANGE_WALLET_STATUS = "/admin/wallet-action",
  CHANGE_WITHDRAW_STATUS = "/admin/withdraw-action",
  CHANGE_USER_STATUS = "/admin/user-status-change",
  ADD_EDIT_CONTACT_US = "/admin/add-edit-contact-us",
  GET_CONTACT_US = "/admin/get-contact-us"
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  // get user list
  getUserList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.USER_LIST);
  }

  // get user wallet list
  getUserWalletList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.USER_WALLET_LIST);
  }

  // get user withdraw list
  getUserWithdrawList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.USER_WITHDRAW_LIST);
  }

  // change wallet status
  changeWalletStatus(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.CHANGE_WALLET_STATUS, payload);
  }

  // change withdraw status
  changeWithdrawStatus(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.CHANGE_WITHDRAW_STATUS, payload);
  }

  // change user status
  changeUerStatus(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.CHANGE_USER_STATUS, payload);
  }

  // add edit contact us details
  addEditContactUs(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.ADD_EDIT_CONTACT_US, payload);
  }

  // get contact us details
  getContactUsDetails(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_CONTACT_US);
  }
}
