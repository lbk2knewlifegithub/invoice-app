import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-add-new-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <button type="button" class="rounded-full flex w-full py-4 bg-fill justify-center gap-1">
    <span>+</span>
    <span class="font-bold text-muted-900">Add New Item</span>
  </button>
  `,
})
export class AddNewItemComponent {}
