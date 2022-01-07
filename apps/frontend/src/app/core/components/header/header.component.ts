import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <nav class="bg-dark-900 flex items-center justify-between pr-6">
        <!-- logo -->
        <lbk-logo></lbk-logo>
        <!-- end logo -->

        <div class="flex items-center gap-6 h-full">
          <!-- theme -->
          <lbk-theme></lbk-theme>
          <!-- end theme -->

          <!-- divider -->
          <div class="relative h-[72px] w-[1px] bg-muted-800/20"></div>
          <!-- end divider -->

          <!-- profile -->
          <lbk-profile></lbk-profile>
          <!-- end profile -->
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
