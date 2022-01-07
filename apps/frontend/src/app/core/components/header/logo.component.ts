import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative w-[72px] h-[72px] bg-primary-900 rounded-r-[20px] grid place-content-center overflow-hidden"
    >
      <!-- mask -->
      <div class="absolute bottom-0 w-full h-1/2 bg-primary-800 rounded-tl-[20px]"></div>
      <!-- end mask -->

      <img class="z-40" src="assets/logo.svg" alt="Logo" />
    </div>
  `,
})
export class LogoComponent {}
