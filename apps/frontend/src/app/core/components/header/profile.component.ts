import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="aspect-square max-w-[32px] rounded-full lg:max-w-[40px]"
      src="assets/image-avatar.jpg"
      alt="Avatar"
    />
  `,
})
export class ProfileComponent {}
