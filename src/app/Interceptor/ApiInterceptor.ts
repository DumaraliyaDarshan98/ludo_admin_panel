import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService : LocalStorageService
  ) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.localStorageService.getLoggerToken();

        return next.handle(httpRequest.clone({ setHeaders: { authorization: `Bearer ${jwt}`  }}));;
  }
}
