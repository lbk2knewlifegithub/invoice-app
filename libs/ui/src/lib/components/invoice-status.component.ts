import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status } from '@lbk/models';

@Component({
  selector: 'lbk-invoice-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [ngClass]="ngClass"
      class="flex justify-center items-center gap-2  w-[104px] py-3 rounded-md"
    >
      <!-- ball  -->
      <span [ngClass]="ballClass" class="w-2 h-2 rounded-full"></span>
      <!-- end ball  -->

      <span class="font-bold">{{ status | titlecase }}</span>
    </button>
  `,
})
export class InvoiceStatusComponent {
  @Input() status!: Status;

  get ngClass() {
    console.log(this.status);
    return {
      pending: 'text-warning-900 bg-warning-900 bg-opacity-[11%]',
      paid: 'text-success-900 bg-success-900 bg-opacity-[11%]',
      draft: 'bg-fill dark:bg-black/15',
    }[this.status];
  }

  get ballClass() {
    return {
      pending: 'bg-warning-900',
      paid: 'bg-success-900',
      draft: 'bg-black dark:bg-muted-900',
    }[this.status];
  }
}
