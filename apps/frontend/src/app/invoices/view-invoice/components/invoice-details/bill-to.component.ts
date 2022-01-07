import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '@lbk/models';

@Component({
  selector: 'lbk-bill-to',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3">
      <span class="text-muted-900">Bill To</span>
      <h4>{{ clientName }}</h4>

      <lbk-address class="block" [address]="clientAddress"></lbk-address>
    </div>
  `,
})
export class BillToComponent {
  @Input() clientName!: string;
  @Input() clientAddress!: Address;
}