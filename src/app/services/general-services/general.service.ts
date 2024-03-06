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
  GET_CONTACT_US = "/admin/get-contact-us",
  GET_DASHBOARD_DETAILS = "/admin/get-dashboard-details",
  GET_COMMISSION_DETAILS = "/admin/get-commission",
  ADD_EDIT_COMMISSION_DETAILS = "/admin/add-edit-commission",
  REFER_GET_COMMISSION_DETAILS = "/admin/refer-get-commission",
  REFER_ADD_EDIT_COMMISSION_DETAILS = "/admin/refer-add-edit-commission",
  // GET_GAME_HISTORY = "/game/get-admin-game-history",
  GET_GAME_HISTORY = "/game/admin-game-history",
  GET_GAME_HISTORY_DETAILS = "/game/get-game-table/GAMETABLEID",
  NOTIFICATION_LIST = "/notification/list",
  ADD_EDIT_NOTIFICATION_LIST = "/notification/add-edit",
  DELETE_NOTIFICATION_LIST = "/notification/delete",
  PAGE_NOTIFICATION_LIST = "/page-notification/list",
  PAGE_ADD_EDIT_NOTIFICATION_LIST = "/page-notification/add-edit",
  PAGE_DELETE_NOTIFICATION_LIST = "/page-notification/delete"
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

  // get user wallet list
  getDashboardData(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_DASHBOARD_DETAILS);
  }

  // add edit commission details
  addEditCommission(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.ADD_EDIT_COMMISSION_DETAILS, payload);
  }

  // get admin commission details
  getCommissionDetails(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_COMMISSION_DETAILS);
  }

  // add edit commission details
  addEditReferCommission(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.REFER_ADD_EDIT_COMMISSION_DETAILS, payload);
  }

  // get admin commission details
  getReferCommissionDetails(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.REFER_GET_COMMISSION_DETAILS);
  }

  // get game history for the admin
  getGameHistory(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.GET_GAME_HISTORY);
  }

  // get game history for the admin
  getGameHistoryDetails(gameTableId: any): Observable<any> {
    const apiUrl = APIEndPoint.GET_GAME_HISTORY_DETAILS.replace('GAMETABLEID', gameTableId)
    return this.httpClient
      .get<any>(this.baseUrl + apiUrl);
  }

  // get notification List
  getNotificationList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.NOTIFICATION_LIST);
  }

  // add edit notification
  addEditNotification(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.ADD_EDIT_NOTIFICATION_LIST, payload);
  }

  // delete notification
  deleteNotification(id: any): Observable<any> {
    const url = APIEndPoint.DELETE_NOTIFICATION_LIST + '/' + String(id);
    return this.httpClient
      .delete<any>(this.baseUrl + url);
  }

  // get notification List
  getPageNotificationList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + APIEndPoint.PAGE_NOTIFICATION_LIST);
  }

  // add edit notification
  addEditPageNotification(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + APIEndPoint.PAGE_ADD_EDIT_NOTIFICATION_LIST, payload);
  }

  // delete notification
  deletePageNotification(id: any): Observable<any> {
    const url = APIEndPoint.PAGE_DELETE_NOTIFICATION_LIST + '/' + String(id);
    return this.httpClient
      .delete<any>(this.baseUrl + url);
  }
}
