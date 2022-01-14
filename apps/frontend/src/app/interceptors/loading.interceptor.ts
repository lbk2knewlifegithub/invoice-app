import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private readonly _store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
    // return this._tokenService.getToken().pipe(
    //   switchMap((token) => {
    //     const headers = req.headers.set(
    //       "Authorization",
    //       `Bearer ${token?.accessToken}`
    //     );
    //     return next.handle(req.clone({ headers }));
    //   })
    // );
  }
}
