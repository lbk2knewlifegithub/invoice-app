import { Inject, Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LOCAL_STORAGE_TOKEN } from "@frontend/constants";
import { Token, User } from "@lbk/models";
import { map, Observable, of, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class TokenService {
  public static TOKEN_KEY = "token";
  private _jwtHelper: JwtHelperService;

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => "Local Storage Not Supported");
  }

  getToken(): Observable<Token> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(TokenService.TOKEN_KEY)),
      map((value: string | null) => (value ? JSON.parse(value) : undefined))
    );
  }

  clear() {
    this.storage.removeItem(TokenService.TOKEN_KEY);
  }

  decode(token: string): User {
    return this._jwtHelper.decodeToken(token);
  }

  saveAndDecode(token: Token): User {
    this.storage.setItem(TokenService.TOKEN_KEY, JSON.stringify(token));

    return this._jwtHelper.decodeToken(token.accessToken);
  }

  saveToken(token: Token) {
    this.storage.setItem(TokenService.TOKEN_KEY, JSON.stringify(token));
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {
    this._jwtHelper = new JwtHelperService();
  }
}
