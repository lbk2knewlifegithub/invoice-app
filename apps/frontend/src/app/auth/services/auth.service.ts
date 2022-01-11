import { Injectable } from "@angular/core";
import { Credentials, User } from "@lbk/models";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  login({ username, password }: Credentials): Observable<User> {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== "test" && username !== "ngrx") {
      return throwError("Invalid username or password");
    }

    return of({ name: "User", id: "12s" });
  }

  logout() {
    return of(true);
  }
}
