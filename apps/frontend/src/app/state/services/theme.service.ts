import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE_TOKEN } from "@frontend/invoices/constants";
import { Observable, of, throwError } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private themeKey = "darkTheme";

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => "Local Storage Not Supported");
  }

  getTheme(): Observable<boolean> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.themeKey)),
      map((value: string | null) => (value ? JSON.parse(value) : false))
    );
  }

  toggle()  {

  }

  toDarkTheme() {
    this.storage.setItem(this.themeKey, "true");
    document.body.classList.add("dark");
  }

  toLightTheme() {
    this.storage.setItem(this.themeKey, "false");
    document.body.classList.remove("dark");
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}
