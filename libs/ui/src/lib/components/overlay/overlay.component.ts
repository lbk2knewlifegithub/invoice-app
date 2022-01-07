import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  fadeInLeftOnEnterAnimation, fadeInOnEnterAnimation, fadeOutLeftOnLeaveAnimation, fadeOutOnLeaveAnimation
} from 'angular-animations';

@Component({
  selector: 'lbk-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="open"
      @fadeInOnEnter
      @fadeOutOnLeave
      class="absolute top-[72px]  w-full z-10 bg-black/40"
    >
      <div
        @fadeInLeftOnEnter
        @fadeOutLeftOnLeave
        class="overlay bg-white z-50 "
      >
        <div class="pt-8 px-6">
          <!-- back button -->
          <lbk-go-back
            [navigation]="false"
            (click)="goBack.emit()"
          ></lbk-go-back>
          <!-- end back button -->

          <!-- panel -->
          <div class="block mt-6">
            <ng-content select=".panel"></ng-content>
          </div>
          <!-- end panel -->
        </div>

        <!-- mask -->
        <div
          class="h-16 bg-gradient-to-b from-[hsla(0,0%,0%,0.001)]  to-black/10 mt-6"
        ></div>
        <!-- end mask -->

        <!-- actions -->
        <div class="py-5 pr-6">
          <ng-content select=".actions"></ng-content>
        </div>
        <!-- end actions -->
      </div>
    </div>
  `,
  animations: [
    fadeInLeftOnEnterAnimation({ delay: 300 }),
    fadeOutLeftOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation({ delay: 300 }),
  ],
})
export class OverlayComponent {
  @Input() open!: boolean;
  @Output() goBack = new EventEmitter<void>();
}
