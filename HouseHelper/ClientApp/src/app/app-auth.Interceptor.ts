import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { LoaderService } from './services/shared/loader.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
   constructor(private authenticationService: UserService, private loaderService: LoaderService) {}
   intercept(req: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
      this.loaderService.isLoading.next(true);
      const authtoken = localStorage.getItem('token');
      if (authtoken && authtoken !== '') {
        req = req.clone({
            setHeaders: {
                Authorization: authtoken
            }
        });
    }
    return Observable.create(observer => {
      // tslint:disable-next-line:no-shadowed-variable
      const subscription = newRequest.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            if (err.status === 401) {
              this.authenticationService.logout();
              location.reload(true);
          }
          this.removeRequest(req);
          return throwError(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
    }
    removeRequest(req: HttpRequest<any>) {
      const i = this.requests.indexOf(req);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }
      this.loaderService.isLoading.next(this.requests.length > 0);
    }
}
