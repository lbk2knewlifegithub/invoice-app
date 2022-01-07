import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="max-w-[32px] max-h-[32px] rounded-full"
      src="assets/image-avatar.jpg"
      alt="Avatar"
    />
  `,
})
export class ProfileComponent {}
