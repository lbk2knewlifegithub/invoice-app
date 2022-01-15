import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credentials, Token, User } from "@lbk/models";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { TokenService } from ".";

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
      .post<Token>("/api/auth/login", credentials, { observe: "body" })
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
      .post<Token>("/api/auth/signup", credentials, { observe: "body" })
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
      .post("/api/auth/me", { accessToken })
      .pipe(map((_) => this._tokenService.decode(accessToken)));
  }
}
