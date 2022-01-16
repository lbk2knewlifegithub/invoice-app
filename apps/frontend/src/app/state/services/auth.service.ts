import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credentials, Token, User } from "@lbk/models";
import { environment as env } from "apps/frontend/src/environments/environment";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _tokenService: TokenService
  ) {}

  login(credentials: Credentials): Observable<Token> {
    return this._http
      .post<Token>(`${env.api}auth/login`, credentials, { observe: "body" })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return error.status === 401
            ? throwError(() => "Username or password incorrect.")
            : throwError(() => "Something wrong. Please try again.");
        })
      );
  }

  signup(credentials: Credentials): Observable<Token> {
    return this._http
      .post<Token>(`${env.api}auth/signup`, credentials, { observe: "body" })
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

  /**
   *
   * @param accessToken
   * @returns  true if verify success
   * - Throw error when verify failure
   */
  me(accessToken: string): Observable<User | null> {
    return this._http
      .post(`${env.api}auth/me`, { accessToken })
      .pipe(map((_) => this._tokenService.decode(accessToken)));
  }
}
