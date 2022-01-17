import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "lbk-login-button",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      routerLink="/login"
      class="aspect-square w-10 rounded-full text-white  bg-primary-900 shadow-sm grid place-content-center lg:w-12 "
    >
      Login
    </a>
  `,
})
export class LoginButtonComponent {}
