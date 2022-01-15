import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

@Component({
  selector: "lbk-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      [class.fixed]="openOverlay"
      class="w-full lg:fixed lg:left-0 lg:top-0 lg:w-fit lg:h-full z-50"
    >
      <nav
        class="bg-dark-900 flex items-center justify-between lg:flex-col lg:h-full  lg:rounded-r-[20px] lg:overflow-hidden"
      >
        <!-- logo -->
        <lbk-logo routerLink="/" class="cursor-pointer"></lbk-logo>
        <!-- end logo -->

        <div
          class="flex items-center gap-6 pr-6 h-full md:gap-8 lg:flex-col lg:h-auto lg:p-0 lg:pb-6"
        >
          <!-- theme -->
          <lbk-theme
            (click)="toggleTheme()"
            [darkTheme]="darkTheme"
            class="block lg:mb-2"
          ></lbk-theme>
          <!-- end theme -->

          <!-- divider -->
          <div
            class="relative h-[72px] w-[1px] bg-muted-800/20 lg:h-[1px] lg:w-[103px]"
          ></div>
          <!-- end divider -->

          <!-- profile -->
          <lbk-profile (click)="logout.emit()"></lbk-profile>
          <!-- end profile -->
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  @Input() openOverlay!: boolean;
  @Input() darkTheme!: boolean;

  @Output() toDarkTheme = new EventEmitter<void>();
  @Output() toLightTheme = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  toggleTheme() {
    if (this.darkTheme) return this.toLightTheme.emit();
    return this.toDarkTheme.emit();
  }
}
