import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-go-back',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="onBack()" class="flex items-center gap-6 group hover:opacity-60">
      <span class="fas fa-angle-left duration-500 text-primary-900 group-hover:-translate-x-1"></span>
      <span class="font-black">Go back</span>
    </button>
  `,
})
export class GoBackComponent {
  @Input() navigation = true;

  constructor(private readonly _location: Location) {}

  onBack() {
    if (this.navigation) return this._location.back();
  }
}
