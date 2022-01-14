import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credentials, User } from "@lbk/models";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  login({ username, password }: Credentials): Observable<User> {
    // return of({ username: "User" });
    return of({ username: "Banana" });
  }

  signup(credentials: Credentials): Observable<User> {
    return this._http
      .post<User>("http://localhost:3000/api/auth/signup", credentials, {
        observe: "body",
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return error.status === 409
            ? throwError(() => "User name already existed ")
            : throwError(() => "Something wrong. Please try again.");
        })
      );
  }

  logout() {
    return of(true);
  }
}
