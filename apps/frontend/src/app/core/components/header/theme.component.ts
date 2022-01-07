import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-theme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="text-primary-800 duration-300 hover:text-primary-900">
      <span class="fa fa-moon text-xl"></span>
    </button>
  `,
})
export class ThemeComponent {}
