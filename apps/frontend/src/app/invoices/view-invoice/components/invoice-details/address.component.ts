import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '@lbk/models';

@Component({
  selector: 'lbk-address',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-sm text-muted-900">
      <p>{{ address.street }}</p>
      <p>{{ address.city }}</p>
      <p>{{ address.postCode }}</p>
      <p>{{ address.country }}</p>
    </div>
  `,
})
export class SenderAddressComponent {
  @Input() address!: Address;
}
