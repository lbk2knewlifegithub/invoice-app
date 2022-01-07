import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceOptions } from '@lbk/models';

@Component({
  selector: 'lbk-grand-total',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-nav-900 p-6 text-inverted-900 flex items-center justify-between"
    >
      <span class="text-sm">Grand Total</span>

      <lbk-price [options]="priceOptions" [value]="grandTotal"></lbk-price>
    </div>
  `,
})
export class GrandTotalComponent {
  @Input() grandTotal!: number;

  priceOptions: PriceOptions = {
    size: 'text-xl',
  };
}
