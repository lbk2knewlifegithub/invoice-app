import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="lg:fixed lg:left-0 lg:top-0 lg:h-full">
      <nav class="bg-dark-900 flex items-center justify-between lg:flex flex-col lg:h-full  lg:rounded-r-[20px]">
        <!-- logo -->
        <lbk-logo></lbk-logo>
        <!-- end logo -->

        <div class="flex items-center gap-6 pr-6 h-full md:gap-8 lg:flex-col lg:h-auto lg:p-0 lg:pb-6">
          <!-- theme -->
          <lbk-theme class="block lg:mb-2"></lbk-theme>
          <!-- end theme -->

          <!-- divider -->
          <div class="relative h-[72px] w-[1px] bg-muted-800/20 lg:h-[1px] lg:w-[103px]"></div>
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
