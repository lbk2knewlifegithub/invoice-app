import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "lbk-profile",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button>
      <img
        class="aspect-square max-w-[32px] rounded-full lg:max-w-[40px]"
        src="assets/avatar.jpeg"
        alt="Avatar"
      />
    </button>
  `,
})
export class ProfileComponent {}
